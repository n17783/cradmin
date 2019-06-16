USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[InsertRole]    Script Date: 06/16/2019 14:16:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[InsertRole]	
@RoleDescription NVARCHAR(100),
@DeptId INT,
@RoleEntryBy INT
AS
BEGIN
	insert into tblRollMaster
	(RollDescription,DeptId,RollEntryDate,RollEntryBy)
	values(@RoleDescription,@DeptId,GETDATE(),@RoleEntryBy)
END
