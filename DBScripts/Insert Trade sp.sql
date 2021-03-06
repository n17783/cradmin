USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Insert_Trade]    Script Date: 06/24/2019 21:04:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Insert_Trade]
@TradDescription nvarchar(200),
@TradeCId int,

@CreatedBy nvarchar(150),
@SanctionDate datetime



AS
BEGIN
	 if(exists(select * from tblTrade where TradDescription=@TradDescription))
    begin
		select 0 as SuccessFailed
    end
    else
    begin
		insert into tblTrade
		(TradDescription,TradeCId,EntryBy,TEntryDate,CreatedBy,SanctionDate)
		values(@TradDescription,@TradeCId,1,GETDATE(),@CreatedBy,@SanctionDate)
		
		select 1 as SuccessFailed
    end
END