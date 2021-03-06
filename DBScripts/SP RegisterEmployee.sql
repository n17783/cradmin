USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Register_Employee]    Script Date: 07/06/2019 06:27:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Register_Employee]
	@PkId int=null,
@Regt_No nvarchar(200)=null,
@Gender bit=null,
@FName nvarchar(200)=null,
@MName nvarchar(200)=null,
@LName nvarchar(200)=null,
@DOB datetime=null,
@BloodGroup nvarchar(10)=null,
@EmpPhoto nvarchar(300)=null,
@PanNo nvarchar(30)=null,
@AadharNo nvarchar(100)=null,
@EmpTypeId int=null,
@JoiningStatus bit=null,
@DateOfReport datetime=null,
@ContractorId int=null,
@ContactNo nvarchar(20)=null,
@EmrContactNo nvarchar(20)=null,
@IdProofType nvarchar(100)=null,
@IdProofNo nvarchar(100)=null,
@IdProofImage nvarchar(300)=null,
@PHouseNo nvarchar(100)=null,
@PVillageId int=null,
@PDisticId int=null,
@PTalukaId nvarchar(100)=null,
@PStateId int=null,
@PCountryId int=null,
@PPincodeId int=null,
@THouseNo nvarchar(100)=null,
@TVillageId nvarchar(100)=null,
@TDisticId int=null,
@TTalukaId nvarchar(100),
@TStateId int=null,
@TCountryId int=null,
@TPincode nvarchar(100)=null,
@ReJoineOrNewJoin bit=null,
@DeptZoneId int=null,
@RegistrationDate datetime=null,
@EntryBy int=null,
@EnteryDate datetime=null,
@ValidationAgencyId int=null,
@IsAlreadyValidated bit=null,
@TradeId int=null,
@AdhaarImage nvarchar(150)=null,
@IsDMorStaff bit=null,
@UserName varchar(150)=null
AS
BEGIN
	declare @IsNewUser bit=0;
	if(@PkId is null)
	begin
		INSERT INTO tblEmployeeMaster ([Regt_No],[Gender],[FName],[MName],[LName],[DOB],[BloodGroup],[EmpPhoto],[PanNo],[AadharNo])
		values(@Regt_No,@Gender,@FName,@MName,@LName,@DOB,@BloodGroup,@EmpPhoto,@PanNo,@AadharNo)
		set @IsNewUser=1;
		SET @PkId = ident_current('tblEmployeeMaster');
	end

	declare @EmpDetailsId int;
	
	INSERT INTO tblEmployeeDetails
           ([EmpTypeId],[JoiningStatus],[DateOfReport],[ContractorId],[ContactNo],
           [EmrContactNo],[IdProofType],[IdProofNo],[IdProofImage],[PHouseNo],[PVillageId],[PDisticId],
           [PTalukaId],[PStateId],[PCountryId],[PPincodeId],[THouseNo],[TVillageId],[TDisticId]
           ,[TTalukaId],[TStateId],[TCountryId],[TPincode],[ReJoineOrNewJoin],[DeptZoneId],[RegistrationDate]
           ,[EntryBy],[EnteryDate],[ValidationAgencyId],[IsAlreadyValidated],[TradeId],[AdhaarImage],[IsDMorStaff])
     VALUES
           (@EmpTypeId,@JoiningStatus,@DateOfReport,@ContractorId,@ContactNo,
           @EmrContactNo,@IdProofType,@IdProofNo,@IdProofImage,@PHouseNo,@PVillageId,@PDisticId,
           @PTalukaId,@PStateId,@PCountryId,@PPincodeId,@THouseNo,@TVillageId,@TDisticId,@TTalukaId,@TStateId,@TCountryId,@TPincode,@ReJoineOrNewJoin,@DeptZoneId,@RegistrationDate,
           @EntryBy,GETDATE(),@ValidationAgencyId,@IsAlreadyValidated,@TradeId,@AdhaarImage,@IsDMorStaff)
       
      SET @EmpDetailsId = ident_current('tblEmployeeDetails');
           
      INSERT INTO tblEmpExitProcess ([EmpDetailsId],[IsExit])
     VALUES (@EmpDetailsId,'false')	
     
     if(@IsDMorStaff=1 and @IsNewUser=1)
     begin
		insert into tblUserMaster
		(UserName,EntryDate,Pssword,EmployeeId)
		values(@UserName,GETDATE(),'123456',@PkId)
     end
     select @PKId as PKId,@EmpDetailsId as EmpDetailsId
END