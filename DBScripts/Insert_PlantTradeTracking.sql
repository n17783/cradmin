USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Insert_PlantTradeTracking]    Script Date: 07/21/2019 21:20:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Batch submitted through debugger: SQLQuery7.sql|7|0|C:\Users\BhargavISEF\AppData\Local\Temp\~vsD2A9.sql
ALTER PROCEDURE [dbo].[Insert_PlantTradeTracking]
@PlantTradeTrackingId int =null,
@TradeId int, 
@AuthorizedStrenth nvarchar(10),
@AuthorizedBy nvarchar(150),
@AuthorizedDate datetime,
@PlantId int,
@EntryBy int=null
AS
 if(exists(select * from PlantTradeTracking where TradeId=@TradeId and AuthorizedStrenth=@AuthorizedStrenth and PlantId=@PlantId   ))
    begin
		select 0 as SuccessFailed
    End
    else
   begin
    if(@PlantTradeTrackingId is not null)
    begin
     update PlantTradeTracking set IsContinew=0,UnAuthorizedDate=@AuthorizedDate,ExitEntryDate=GETDATE(),
     UnAuthorizedBy=@AuthorizedBy,ExitEntryBy=@EntryBy where PlantTradeTrackingId= @PlantTradeTrackingId
     insert into PlantTradeTracking
		(TradeId,AuthorizedStrenth,AuthorizedBy,AuthorizedDate,PlantId,IsContinew,EntryBy)
		values(@TradeId,@AuthorizedStrenth,@AuthorizedBy,@AuthorizedDate,@PlantId,1,@EntryBy)
	end	
	else
	begin
		insert into PlantTradeTracking
		(TradeId,AuthorizedStrenth,AuthorizedBy,AuthorizedDate,PlantId,IsContinew,EntryBy,EntryDate)
		values(@TradeId,@AuthorizedStrenth,@AuthorizedBy,@AuthorizedDate,@PlantId,1,@EntryBy,GETDATE())
		
    end
     select 1 as SuccessFailed
end



    
   
