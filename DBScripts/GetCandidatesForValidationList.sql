USE [CRAsia29July19]
GO
/****** Object:  StoredProcedure [dbo].[GetCandidatesForValidationList]    Script Date: 08/25/2019 14:31:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pravin Gaikwad
-- Create date: 3/8/19
-- Description:	GetCandidatesForValidationList
-- =============================================
-- exec GetCandidatesForValidationList
ALTER PROCEDURE [dbo].[GetCandidatesForValidationList]
 
	@PageNo int=1,
	@PageSize int=10,
	@getCandidates Varchar(100)='AssessmentReport'
AS
BEGIN

declare @TotalRecords int

IF @getCandidates ='Pending'
BEGIN

	Select ROW_NUMBER() OVER(ORDER BY EM.PkId DESC) as RowNum,
	EM.PkId SrNo,ED.EmpDetailsId,EM.Regt_No PRN,EM.AadharNo Adhar,EM.FName Name,'./Content/Images/user1-128x128.jpg' PhotoURL,
	ED.TradeId, TC.TradCDescription TradeCategory,'' ProjectTypeName,
	CASE WHEN VD.VOResult IS NULL THEN '0'  
	WHEN VD.VOResult =1  THEN '1' ELSE '2'	END OralResult,
	CASE WHEN VD.VPResult IS NULL THEN '0'  
	WHEN VD.VPResult =1  THEN '1' ELSE '2'	END PracticalResult, 
	CASE WHEN VD.VWResult IS NULL THEN '0'  
	WHEN VD.VWResult =1  THEN '1' ELSE '2'	END WrittenResult,
	'0' TestResult,
	'' ValidationDate,
	 T.TradDescription TradeName,
	 ISNULL(EmpValidationId,0) EmpValidationId
	 into #TmpCandidatesForValidationList
	 from tblEmployeeMaster EM with(nolock) 
	INNER JOIN tblEmployeeDetails ED with(nolock)  ON ED.PkId= EM.PkId
	INNER JOIN tblEmpType ET WITH(NOLOCK) ON ET.EmpTypeId=ED.EmpTypeId	
	INNER JOIN tblTrade T with(nolock) ON T.TradeId=ED.TradeId
	LEFT JOIN tblTradeCatagory TC WITH(NOLOCK) ON TC.TradeCId=T.TradeCId
	LEFT JOIN tblValidationDetails VD WITH(NOLOCK) ON VD.EmpDetailsId=ED.EmpDetailsId
	WHERE ET.EmpDesignation='DM' and isnull(ED.IsAlreadyValidated,0)=0
	AND (VD.VOResult IS NULL OR VD.VPResult IS NULL OR VD.VWResult IS NULL)
	
	select @TotalRecords=COUNT(1) from #TmpCandidatesForValidationList
	
	if(@PageNo is null and @PageSize is null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpCandidatesForValidationList	
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpCandidatesForValidationList
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	
	
	drop table #TmpCandidatesForValidationList
	
END
ELSE IF @getCandidates='Completed'
BEGIN 
	Select ROW_NUMBER() OVER(ORDER BY EM.PkId DESC) as RowNum,
	EM.PkId SrNo,ED.EmpDetailsId,EM.Regt_No PRN,EM.AadharNo Adhar,EM.FName Name,'./Content/Images/user1-128x128.jpg' PhotoURL,
	ED.TradeId, TC.TradCDescription TradeCategory,'' ProjectTypeName,
	'0' OralResult,
	'0' PracticalResult,
	'0' WrittenResult,
	CASE WHEN VResult=1	
	THEN '1' ELSE '0' END TestResult,
	CONVERT(VARCHAR(15), VCompliteDate, 101) ValidationDate,
	 T.TradDescription TradeName,
	 ISNULL(EmpValidationId,0) EmpValidationId
	 into #TmpCandidatesValidatedList
	 from tblEmployeeMaster EM with(nolock) 
	INNER JOIN tblEmployeeDetails ED with(nolock)  ON ED.PkId= EM.PkId
	INNER JOIN tblEmpType ET WITH(NOLOCK) ON ET.EmpTypeId=ED.EmpTypeId	
	INNER JOIN tblTrade T with(nolock) ON T.TradeId=ED.TradeId
	LEFT JOIN tblTradeCatagory TC WITH(NOLOCK) ON TC.TradeCId=T.TradeCId
	LEFT JOIN tblValidationDetails VD WITH(NOLOCK) ON VD.EmpDetailsId=ED.EmpDetailsId
	WHERE ET.EmpDesignation='DM' and isnull(ED.IsAlreadyValidated,0)=0
	AND VD.VOResult IS NOT NULL AND VD.VPResult IS NOT NULL AND VD.VWResult IS NOT NULL
	
	select @TotalRecords=COUNT(1) from #TmpCandidatesValidatedList
	
	if(@PageNo is null and @PageSize is null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpCandidatesValidatedList	
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpCandidatesValidatedList
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	
	
	drop table #TmpCandidatesValidatedList
	
END
ELSE IF @getCandidates='AssessmentReport'
BEGIN 

	Select ROW_NUMBER() OVER(ORDER BY EM.PkId DESC) as RowNum,
	EM.PkId SrNo,ED.EmpDetailsId,EM.Regt_No PRN,EM.AadharNo Adhar,EM.FName Name,'./Content/Images/user1-128x128.jpg' PhotoURL,
	ED.TradeId, TC.TradCDescription TradeCategory,'' ProjectTypeName,
	CASE WHEN VResult=1	
	THEN '1' ELSE '0' END TestResult,
	CONVERT(VARCHAR(15), VCompliteDate, 101) ValidationDate,
	 T.TradDescription TradeName,
	 ISNULL(EmpValidationId,0) EmpValidationId
	 into #TmpCandidatesAssessmentReportList
	 from tblEmployeeMaster EM with(nolock) 
	INNER JOIN tblEmployeeDetails ED with(nolock)  ON ED.PkId= EM.PkId
	INNER JOIN tblEmpType ET WITH(NOLOCK) ON ET.EmpTypeId=ED.EmpTypeId	
	INNER JOIN tblTrade T with(nolock) ON T.TradeId=ED.TradeId
	INNER JOIN tblTradeCatagory TC WITH(NOLOCK) ON TC.TradeCId=T.TradeCId
	INNER JOIN tblValidationDetails VD WITH(NOLOCK) ON VD.EmpDetailsId=ED.EmpDetailsId
	WHERE ET.EmpDesignation='DM' and isnull(ED.IsAlreadyValidated,0)=0
	AND VD.VOResult IS NOT NULL AND VD.VPResult IS NOT NULL AND VD.VWResult IS NOT NULL
	AND VD.VCompliteDate IS NOT NULL and VD.VAssessmentDate is NULL
	
	select @TotalRecords=COUNT(1) from #TmpCandidatesAssessmentReportList
	
	if(@PageNo is null and @PageSize is null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpCandidatesAssessmentReportList	
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpCandidatesAssessmentReportList
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	
	
	drop table #TmpCandidatesAssessmentReportList
	
END
ELSE IF @getCandidates='AssessmentComplete'
BEGIN 

	Select ROW_NUMBER() OVER(ORDER BY EM.PkId DESC) as RowNum,
	EM.PkId SrNo,ED.EmpDetailsId,EM.Regt_No PRN,EM.AadharNo Adhar,EM.FName Name,	
	CONVERT(VARCHAR(15), VAssessmentDate, 101) AssessmentDate,	
	 ISNULL(EmpValidationId,0) EmpValidationId,
	 VAM.AgencyDescription ValidationAgency,
	 VD.VAssessmentNo AssessmentNo
	 into #TmpCandidatesAssessmentCompleteList
	 from tblEmployeeMaster EM with(nolock) 
	INNER JOIN tblEmployeeDetails ED with(nolock)  ON ED.PkId= EM.PkId
	INNER JOIN tblEmpType ET WITH(NOLOCK) ON ET.EmpTypeId=ED.EmpTypeId	
	INNER JOIN tblValidationDetails VD WITH(NOLOCK) ON VD.EmpDetailsId=ED.EmpDetailsId
	LEFT join tblValidationAgencyMaster VAM WITH(NOLOCK) ON VAM.ValidationAgencyId=VD.VAgencyId
	WHERE ET.EmpDesignation='DM' and isnull(ED.IsAlreadyValidated,0)=0
	AND VD.VOResult IS NOT NULL AND VD.VPResult IS NOT NULL AND VD.VWResult IS NOT NULL
	AND VD.VCompliteDate IS NOT NULL and VD.VAssessmentDate is NOT NULL
	
	select @TotalRecords=COUNT(1) from #TmpCandidatesAssessmentCompleteList
	
	if(@PageNo is null and @PageSize is null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpCandidatesAssessmentCompleteList	
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpCandidatesAssessmentCompleteList
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	
	
	drop table #TmpCandidatesAssessmentCompleteList
	
END	
	
	
	
END
