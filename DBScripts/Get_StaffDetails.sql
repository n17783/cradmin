-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE Get_StaffDetails 
	@PageNo int=Null,
	@PageSize int=null
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY Um.UserId DESC) as RowNum,Um.UserId,emp.FName,emp.MName,emp.LName,emp.AadharNo,ee.IsExit,ed.IsDMorStaff,
	emp.PkId,ed.EmpDetailsId,Um.RollId into #TmpStaffDetails
	from tblEmployeeMaster emp
	inner join tblEmployeeDetails ed
	on emp.PkId=ed.PkId
	inner join tblEmpExitProcess ee
	on ed.PkId=ee.EmpDetailsId
	inner join tblUserMaster Um on emp.PkId=Um.EmployeeId
	where ee.IsExit=0 and ed.IsDMorStaff=0 and Um.IsContinew=1

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
END

