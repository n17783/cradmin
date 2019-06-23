USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Insert_ProjectType]    Script Date: 06/20/2019 12:49:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[Insert_ProjectType]
@ProjectTypeDescription nvarchar(200),
@PTEntryBy int,
@CreatedBy nvarchar(150)


AS
BEGIN
	 if(exists(select * from tblProjectType where ProjectTypeDescription=@ProjectTypeDescription))
    begin
		select 0 as SuccessFailed
    end
    else
    begin
		insert into tblProjectType
		(ProjectTypeDescription,PTEnteryDate,PTEntryBy,CreatedBy)
		values(@ProjectTypeDescription,GETDATE(),@PTEntryBy,@CreatedBy)
		
		select 1 as SuccessFailed
    end
END
