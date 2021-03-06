USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[GetEmployeeTypeList]    Script Date: 06/16/2019 14:10:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[GetEmployeeTypeList]
	@PageNo int=1,
	@PageSize int=2
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY EmpTypeId DESC) as RowNum,* into #TmpEmpType
	from tblEmpType WITH(NOLOCK)
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpEmpType
	
	if(@PageNo is null and @PageSize is null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpEmpType	
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpEmpType
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	
	
	drop table #TmpEmpType
END
