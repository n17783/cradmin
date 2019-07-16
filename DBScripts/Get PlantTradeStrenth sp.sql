USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Get_PlantAuthorizedStrenth]    Script Date: 07/09/2019 23:14:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Get_PlantAuthorizedStrenth]
	@PageNo int=null,
	@PageSize int=null,
	@Prefix nvarchar(100)=null,
	@flag bit =0 




As
begin

select ptt.PlantTradeTrackingId,ptt.TradeId,ptt.PlantId,t.TradDescription,p.PlantTitle,ptt.AuthorizedStrenth,ptt.AuthorizedDate,ptt.AuthorizedBy, ROW_NUMBER() OVER(ORDER BY PlantTradeTrackingId DESC) as RowNum into #TmpPlantTradeTracking
	from PlantTradeTracking ptt  inner join tblTrade t on t.TradeId=ptt.TradeId inner join tblPlantMaster p on
	 p.PlantId=ptt.PlantId 
	 where (ptt.IsContinew=1 or ptt.IsContinew=1 ) and p.PlantTitle like (case when @Prefix is null then '%' + p.PlantTitle + '%' else '%'+ @Prefix + '%' end)
	
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpPlantTradeTracking
	
	if(@PageNo is null and @PageSize is null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpPlantTradeTracking
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpPlantTradeTracking
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	drop table #TmpPlantTradeTracking
	
	
END