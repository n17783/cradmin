USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[get_trade_category]    Script Date: 06/09/2019 00:03:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[get_trade_category]
	@PageNo int=NULL,
	@PageSize int=NULL
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY TradeCId DESC) as RowNum,* into #TmpCategory
	from tblTradeCatagory
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpCategory
	if(@PageNo is null and @PageSize is null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpCategory
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpCategory
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	
	
	drop table #TmpCategory
END
