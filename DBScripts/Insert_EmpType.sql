alter PROCEDURE Insert_EmpType
	@EmpDesignation nvarchar(150),
	@IsDmOrStaff bit,
	@EntryBy int,
	@CreatedByAuthority nvarchar(150)
AS
BEGIN
if(exists(select * from tblEmpType where EmpDesignation=@EmpDesignation))
    begin
		select 0 as SuccessFailed
    end
    else
    begin
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
end
           
END
GO
