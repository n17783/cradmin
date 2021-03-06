USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Get_Zone_Details]    Script Date: 06/25/2019 21:22:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create PROCEDURE Get_CourseMasterList
	@PageNo int=Null,
	@PageSize int=NULL
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY CourseId DESC) as RowNum,* into #TmpCourseMaster
	from tblCourseMaster
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpCourseMaster
	
	if(@PageNo is not null and @PageSize is not null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpCourseMaster
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpCourseMaster
	end
	
	drop table #TmpCourseMaster
END
