CREATE PROCEDURE Insert_EmpType
	@EmpDesignation nvarchar(150),
	@IsDmOrStaff bit,
	@EntryBy int,
	@CreatedByAuthority nvarchar(150)
AS
BEGIN
	INSERT INTO tblEmpType
           (EmpDesignation
           ,IsDmOrStaff
           ,EntryBy
           ,EntryDate
           ,CreatedByAuthority)
     values(@EmpDesignation
           ,@IsDmOrStaff
           ,@EntryBy
           ,GETDATE()
           ,@CreatedByAuthority)
END
GO
