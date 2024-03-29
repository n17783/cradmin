USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[GetFormForAssign]    Script Date: 07/15/2019 17:42:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[GetFormForAssign]
	@PageNo int=1,
	@PageSize int=4
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY FormId DESC) as RowNum,* into #Tmpform
	from dbo.tblFormMaster WITH(NOLOCK)
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #Tmpform
	
	select FormId,FormName,FormTitle, @TotalRecords as TotalRecords from #Tmpform
	where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
	@PageNo * @PageSize
	
	drop table #Tmpform
END