USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Insert_ProjectType]    Script Date: 08/08/2019 15:03:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[Insert_ProjectType]
@ProjectTypeDescription nvarchar(200)



AS
BEGIN
	 if(exists(select * from tblProjectType where ProjectTypeDescription=@ProjectTypeDescription))
    begin
		select 0 as SuccessFailed
    end
    else
    begin
		insert into tblProjectType
		(ProjectTypeDescription)
		values(@ProjectTypeDescription)
		
		select 1 as SuccessFailed
    end
END
