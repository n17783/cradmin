USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[GetValidationAgencyList]    Script Date: 06/16/2019 14:13:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[GetValidationAgencyList]
	@PageNo int=1,
	@PageSize int=2
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY ValidationAgencyId DESC) as RowNum,* into #TmpTable
	from dbo.tblValidationAgencyMaster WITH(NOLOCK)
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpTable
	
	if(@PageNo is null and @PageSize is null)
	begin
			select *,
		@TotalRecords as TotalRecords from #TmpTable
		
	end
	else
	begin
	
		select *,
		@TotalRecords as TotalRecords from #TmpTable
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	drop table #TmpTable
END
