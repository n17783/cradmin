USE [CRAsia29July19]
GO
/****** Object:  StoredProcedure [dbo].[GetAssessedReportDetails]    Script Date: 08/25/2019 14:33:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[GetAssessedReportDetails]
--declare
	@EmpValidationId INT=1

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

Select ROW_NUMBER() OVER(ORDER BY EM.PkId DESC) as RowNum,
	EM.PkId SrNo,ED.EmpDetailsId,EM.Regt_No PRN,EM.AadharNo Adhar,EM.FName Name,'./Content/Images/user1-128x128.jpg' PhotoURL,
	ED.TradeId, TC.TradCDescription TradeCategory,'' ProjectTypeName,	
	CONVERT(VARCHAR(15), VAssessmentDate, 101) AssessmentDate,
	 T.TradDescription TradeName,
	 ISNULL(EmpValidationId,0) EmpValidationId,
	 'CRAC-'+LTRIM(RTRIM(EM.AadharNo)) ApplicationID,
	 'CRAC-'+LTRIM(RTRIM(EM.AadharNo))+'-ASMNT' AssessmentID,
	 'Job Title' JobTitle,
	 'Mobile No' MobileNo,
	 'Emergency Contact No' EmergencyContactNo,
	 'Contractor ' Contractor ,
	 'Permanent Address' PermanentAddress,
	 'City' City,
	 S.StateName State,
	 ED.PPincodeId Pincode,
	 CONVERT(VARCHAR(15), EM.DOB, 101) DOB,
	 'Test Location' TestLocation,
	 VOTotalMarks,VOObtainMarks,
	 VPTotalMarks,VPObtainMarks,
	 VWTotalMarks,VWObtainMarks		 
	 from tblEmployeeMaster EM with(nolock) 
	INNER JOIN tblEmployeeDetails ED with(nolock)  ON ED.PkId= EM.PkId
	INNER JOIN tblEmpType ET WITH(NOLOCK) ON ET.EmpTypeId=ED.EmpTypeId	
	INNER JOIN tblTrade T with(nolock) ON T.TradeId=ED.TradeId
	INNER JOIN tblTradeCatagory TC WITH(NOLOCK) ON TC.TradeCId=T.TradeCId
	INNER JOIN tblValidationDetails VD WITH(NOLOCK) ON VD.EmpDetailsId=ED.EmpDetailsId
	LEFT JOIN tblState S with(nolock) ON S.StateId=ED.PStateId
	WHERE VD.EmpValidationId=@EmpValidationId

END
