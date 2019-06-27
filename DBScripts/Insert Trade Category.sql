USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Insert_Trade_Category]    Script Date: 06/24/2019 21:05:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[Insert_Trade_Category]
@TradCDescription nvarchar(200)
AS
BEGIN

	 if(exists(select * from tblTradeCatagory where TradCDescription=@TradCDescription))
    begin
		select 0 as SuccessFailed
    end
    else
    begin
	insert into tblTradeCatagory
	(TradCDescription,TCEntryDate)
	values(@TradCDescription,GETDATE())
	end
END
