CREATE PROCEDURE Insert_Zone
	@DeptZoneDescription nvarchar(150),
	@DeptZoneAddress nvarchar(300),
	@ContactNo nvarchar(12),
	@EntryBy int,
	@ExitDate datetime,
	@ExitBy int,
	@IsContinew bit
AS
BEGIN
	insert into DeptZoneMaster
	(DeptZoneDescription,DeptZoneAddress,ContactNo,EntryDate,EntryBy,ExitDate,ExitBy,IsContinew)
	values(@DeptZoneDescription,@DeptZoneAddress,@ContactNo,GETDATE(),@EntryBy,@ExitDate,@ExitBy,@IsContinew)
END
GO
