USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Get_Zone_Details]    Script Date: 06/08/2019 16:47:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[Get_Zone_Details]
	@PageNo int=Null,
	@PageSize int=NULL
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY DeptZoneId DESC) as RowNum,* into #TmpDeptZone
	from DeptZoneMaster
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpDeptZone
	
	if(@PageNo is not null and @PageSize is not null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpDeptZone
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpDeptZone
	end
	
	drop table #TmpDeptZone
END
