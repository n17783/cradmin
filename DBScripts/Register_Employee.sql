USE [CRASIA_10AUG2019]
GO
/****** Object:  StoredProcedure [dbo].[Register_Employee]    Script Date: 08/25/2019 15:59:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
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
@PVillageId nvarchar(150)=null,
@PDisticId int=null,
@PTalukaId nvarchar(100)=null,
@PStateId int=null,
@PCountryId int=null,
@PPincodeId nvarchar(10)=null,
@THouseNo nvarchar(100)=null,
@TVillageId nvarchar(100)=null,
@TDisticId int=null,
@TTalukaId nvarchar(100),
@TStateId int=null,
@TCountryId int=null,
@TPincode nvarchar(10)=null,
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
@UserName varchar(150)=null,
@DeptId int=null,
@ProjectTypeId int=null
AS
BEGIN
	declare @IsNewUser bit=0;
	if(@PkId is null)
	begin
		INSERT INTO tblEmployeeMaster ([Regt_No],[Gender],[FName],[MName],[LName],[DOB],[BloodGroup],[EmpPhoto],[PanNo],[AadharNo])
		values(@Regt_No,@Gender,@FName,@MName,@LName,@DOB,@BloodGroup,@EmpPhoto,@PanNo,@AadharNo)
		set @IsNewUser=1;
		SET @PkId = ident_current('tblEmployeeMaster');
		
		set @Regt_No='E0' + CONVERT(varchar(50),@PKId);
		
		update tblEmployeeMaster
		set Regt_No=@Regt_No
		where PKId=@PKId
	end
	else
	begin
		update tblEmployeeMaster
		set FName=case when @FName is null then FName else @FName end,
		MName=case when @MName is null then MName else @MName end,
		LName=case when @LName is null then LName else @LName end,
		DOB=case when @DOB is null then DOB else @DOB end,
		EmpPhoto=case when @EmpPhoto is null then EmpPhoto else @EmpPhoto end,
		PanNo=case when @PanNo is null then PanNo else @PanNo end
		where PKId=@PKId
		
	end
	select @Regt_No=[Regt_No] from tblEmployeeMaster where PkId=@PkId
	
	declare @IsExit bit=1;
	declare @EmpDetailsId int;
	if(@PkId is not null)
	begin
		select @IsExit=ee.IsExit,@EmpDetailsId=ee.EmpDetailsId from tblEmployeeMaster emp 
		inner join tblEmployeeDetails ed on emp.PkId=ed.PkId
		inner join tblEmpExitProcess ee on ed.EmpDetailsId=ee.EmpDetailsId 
		where emp.PkId=@PkId
	end
	if(@IsExit=0)
	begin
		update tblEmployeeDetails
		set [ContractorId]=case when @ContractorId is null then ContractorId else @ContractorId end,
		[ContactNo]=case when @ContactNo is null then ContactNo else @ContactNo end,
		[EmrContactNo]=case when @EmrContactNo is null then EmrContactNo else @EmrContactNo end,
		IdProofType=case when @IdProofType is null then IdProofType else @IdProofType end,
		IdProofNo=case when @IdProofNo is null then IdProofNo else @IdProofNo end,
		IdProofImage=case when @IdProofImage is null then IdProofImage else @IdProofImage end,
		PHouseNo=case when @PHouseNo is null then PHouseNo else @PHouseNo end,
		PVillageId=case when @PVillageId is null then PVillageId else @PVillageId end,
		PDisticId=case when @PDisticId is null then PDisticId else @PDisticId end,
		PTalukaId=case when @PTalukaId is null then PTalukaId else @PTalukaId end,
		PStateId=case when @PStateId is null then PStateId else @PStateId end,
		PCountryId=case when @PCountryId is null then PCountryId else @PCountryId end,
		PPincodeId=case when @PPincodeId is null then PPincodeId else @PPincodeId end,
		THouseNo=case when @PPincodeId is null then PPincodeId else @PPincodeId end,
		TVillageId=case when @TVillageId is null then TVillageId else @TVillageId end,
		TDisticId=case when @TDisticId is null then TDisticId else @TDisticId end,
		TTalukaId=case when @TTalukaId is null then TTalukaId else @TTalukaId end,
		TStateId=case when @TStateId is null then TStateId else @TStateId end,
		TCountryId=case when @TCountryId is null then TCountryId else @TCountryId end,
		TPincode=case when @TPincode is null then TPincode else @TPincode end,
		DeptZoneId=case when @DeptZoneId is null then DeptZoneId else @DeptZoneId end,
		DeptId=case when @DeptId is null then DeptId else @DeptId end
		where EmpDetailsId=@EmpDetailsId
	end
	else
	begin
		INSERT INTO tblEmployeeDetails
			   ([EmpTypeId],PkId,[JoiningStatus],[DateOfReport],[ContractorId],[ContactNo],
			   [EmrContactNo],[IdProofType],[IdProofNo],[IdProofImage],[PHouseNo],[PVillageId],[PDisticId],
			   [PTalukaId],[PStateId],[PCountryId],[PPincodeId],[THouseNo],[TVillageId],[TDisticId]
			   ,[TTalukaId],[TStateId],[TCountryId],[TPincode],[ReJoineOrNewJoin],[DeptZoneId],[RegistrationDate]
			   ,[EntryBy],[EnteryDate],[ValidationAgencyId],[IsAlreadyValidated],[TradeId],[AdhaarImage],[IsDMorStaff],DeptId,ProjectTypeId)
		 VALUES
			   (@EmpTypeId,@PkId,@JoiningStatus,@DateOfReport,@ContractorId,@ContactNo,
			   @EmrContactNo,@IdProofType,@IdProofNo,@IdProofImage,@PHouseNo,@PVillageId,@PDisticId,
			   @PTalukaId,@PStateId,@PCountryId,@PPincodeId,@THouseNo,@TVillageId,@TDisticId,@TTalukaId,@TStateId,@TCountryId,@TPincode,@ReJoineOrNewJoin,@DeptZoneId,@RegistrationDate,
			   @EntryBy,GETDATE(),@ValidationAgencyId,@IsAlreadyValidated,@TradeId,@AdhaarImage,@IsDMorStaff,@DeptId,@ProjectTypeId)
     end  
      SET @EmpDetailsId = ident_current('tblEmployeeDetails');
     
     if(@IsExit=1)
     begin
		INSERT INTO tblEmpExitProcess ([EmpDetailsId],[IsExit])
		VALUES (@EmpDetailsId,'false')	
     end
     
     if(@IsDMorStaff=1 and @IsNewUser=1)
     begin
		if(exists(select * from tblUserMaster where EmployeeId=@PkId and IsContinew=1)) 
		--- Continue is used like delete in user master table
		begin
			update tblUserMaster
			set IsContinew=0
			where EmployeeId=@PkId and IsContinew=1
		end
		insert into tblUserMaster
		(UserName,EntryDate,Pssword,EmployeeId,IsContinew)
		values(@Regt_No,GETDATE(),'123456',@PkId,1)
     end
     select @PKId as PKId,@EmpDetailsId as EmpDetailsId
END