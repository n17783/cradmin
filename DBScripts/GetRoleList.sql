USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[GetRoleList]    Script Date: 06/16/2019 14:15:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[GetRoleList]
	@PageNo int=1,
	@PageSize int=2
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY RollID DESC) as RowNum,* into #TmpRole
	from dbo.tblRollMaster WITH(NOLOCK)
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpRole
	
	select RollId RoleID, RollDescription RoleDescription,DeptId,CAST(RollEntryDate as varchar(50)) RoleEntryDate,
	RollEntryBy RoleEntryBy, @TotalRecords as TotalRecords from #TmpRole
	where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
	@PageNo * @PageSize
	
	drop table #TmpRole
END
