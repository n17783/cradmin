USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Insert_FormMappingToRoll]    Script Date: 07/19/2019 19:36:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Insert_FormMappingToRoll]
 @allformid nvarchar(max)='1,2,3',
 @RollId int=1,
 @EntryBy int=1,
 @RollFormMappingId int,
 @AuthorisedBy nvarchar(100),
 @discontinew nvarchar(10),
 @FormId int=0
as
begin
if(@RollFormMappingId >0 and @discontinew='newcon')
begin 
 insert into tblRollAndFormMapping
          (FormId,RollId,EntryBy,EntryDate,IsContinew,AuthorisedBy)
             SELECT cast(Item AS INTEGER) as FormId,@RollId,@EntryBy,GETDATE() as EntryDate,1 as IsContinew,@AuthorisedBy
             FROM dbo.SplitString(@allformid, ',')
         select 1 as SuccessFailed
    
    end
    
     if(@discontinew='Discon')
    begin
    update tblRollAndFormMapping set IsContinew=0 where RollFormMappingId=@RollFormMappingId and RollId=@RollId and FormId=@FormId
    select 1 as SuccessFailed
    end
    if(exists(select distinct * from tblRollAndFormMapping where FormId IN(
            SELECT CAST(Item AS INTEGER)
            FROM dbo.SplitString(@allformid,','))and IsContinew=1 and RollId=@RollId  ))
    begin
		select 0 as SuccessFailed
    end
    
    else 
     begin
     insert into tblRollAndFormMapping
          (FormId,RollId,EntryBy,EntryDate,IsContinew,AuthorisedBy)
             SELECT cast(Item AS INTEGER) as FormId,@RollId,@EntryBy,GETDATE() as EntryDate,1 as IsContinew,@AuthorisedBy
             FROM dbo.SplitString(@allformid, ',')
         select 1 as SuccessFailed
    end
    
   
    end
   
    
    