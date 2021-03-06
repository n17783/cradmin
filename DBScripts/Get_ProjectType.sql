USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Get_ProjectType]    Script Date: 08/08/2019 15:03:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[Get_ProjectType]
	@PageNo int=NULL,
	@PageSize int=NULL
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY ProjectTypeId DESC) as RowNum,* into #TmpProjectType
	from tblProjectType
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpProjectType
	
	if(@PageNo is null and @PageSize is null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpProjectType
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpProjectType
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	drop table #TmpProjectType
END