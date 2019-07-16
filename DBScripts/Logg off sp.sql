-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE LogOff
	@Token uniqueidentifier=null
AS
BEGIN
	
	declare @UserId int;

	select @UserId=UserId from tblLoginDetails where Token=@Token
	
	update tblLoginDetails
	set IsContinew=0,
	LogOutTime=GETDATE()
	where UserId=@UserId and IsContinew=1
	
END
GO