USE [CRASIA_10AUG2019]
GO
/****** Object:  StoredProcedure [dbo].[Get_StaffDetails]    Script Date: 08/25/2019 20:06:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[Get_StaffDetails]
--declare 
	@PageNo int=Null,
	@PageSize int=null
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY Um.UserId DESC) as RowNum,
	Um.UserId,emp.FName,emp.MName,emp.LName,emp.AadharNo,ee.IsExit,
	ed.IsDMorStaff,
	emp.PkId,ed.EmpDetailsId,Um.RollId,ed.ContactNo 
	into #TmpStaffDetails
	from tblEmployeeMaster emp
	inner join tblUserMaster Um on emp.PkId=Um.EmployeeId
	inner join tblEmployeeDetails ed on emp.PkId=ed.PkId
	inner join tblEmpExitProcess ee on ed.EmpDetailsId=ee.EmpDetailsId
	where 
	ee.IsExit=0 and 
	ed.IsDMorStaff=1 and 
	Um.IsContinew=1 and Um.RollId is null

	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpStaffDetails
	
	if(@PageNo is null and @PageSize is null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpStaffDetails
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpStaffDetails
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	
	drop table #TmpStaffDetails
END

