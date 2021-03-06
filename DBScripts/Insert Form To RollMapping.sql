USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Insert_FormMappingToRoll]    Script Date: 07/15/2019 17:42:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Insert_FormMappingToRoll]
@RollFormMappingId int =null,
@RollId int, 
@FormId nvarchar(10),
@EntryBy int,
@AuthorisedBy int

AS
 if(exists(select * from tblRollAndFormMapping where RollId=@RollId and FormId=@FormId and IsContinew=1   ))
    begin
		select 0 as SuccessFailed
    End
    else
   begin
    if(@RollFormMappingId is not null)
    begin
     update tblRollAndFormMapping set IsContinew=0,ExitDate=GETDATE(),ExitBy=@EntryBy,
     UnAuthorisedBy=@AuthorisedBy where RollFormMappingId= @RollFormMappingId
     insert into tblRollAndFormMapping
		(RollId,FormId,EntryBy,AuthorisedBy,EntryDate,IsContinew)
		values(@RollId,@FormId,@EntryBy,@AuthorisedBy,GETDATE(),1)
	end	
	else
	begin
		 insert into tblRollAndFormMapping
		(RollId,FormId,EntryBy,AuthorisedBy,EntryDate,IsContinew)
		values(@RollId,@FormId,@EntryBy,@AuthorisedBy,GETDATE(),1)
		
    end
     select 1 as SuccessFailed
end
