ALTER PROCEDURE [dbo].[GetLogginDetails] 
--declare
	@UserName varchar(150)=NULL,--'pandurangkumbhar59@gmail.com',
	@Password varchar(100)=NULL--'12345678'
AS
BEGIN
	select * into #TmpLoginUser from tblEmployeeMaster emp
	inner join tblUserMaster ts on emp.PkId=ts.EmployeeId
	where ts.UserName=@UserName and ts.Pssword=@Password
	
	declare @RollId int;
	declare @Token uniqueidentifier;
	declare @EmpId int;
	select @RollId=RollId,@EmpId=PKId from #TmpLoginUser
	
	if(@RollId=1) -- Check Roll Is Super Admin Or Not
	begin
		set @Token=NEWID();
		select *,1 as Authorised,@Token as Token from #TmpLoginUser
		insert into tblLoginDetails
		(UserId,LoginTime,LogOutTime,IsContinew,UnexpecteError,Token)
		values(@EmpId,GETDATE(),null,1,'',@Token)
	end
	else
	begin
		if(exists(select top 1 EE.* from tblEmpExitProcess EE  inner join tblEmployeeDetails ED
		on EE.EmpDetailsId=ED.EmpDetailsId
		inner join #TmpLoginUser LU on ED.PkId=LU.PKId
		order by EE.EntryDate desc))
		begin
			declare @IsExit bit;
			
			select top 1 @IsExit=ISNULL(EE.IsExit,0) from tblEmpExitProcess EE  inner join tblEmployeeDetails ED
			on EE.EmpDetailsId=ED.EmpDetailsId
			inner join #TmpLoginUser LU on ED.PkId=LU.PKId
			order by EE.EntryDate desc
			
			if(@IsExit=1)
			begin
				select *,0 as Authorised,NULL as Token from #TmpLoginUser
			end
			else
			begin
				
				set @Token=NEWID();
				select *,1 as Authorised,@Token as Token from #TmpLoginUser
				insert into tblLoginDetails
				(UserId,LoginTime,LogOutTime,IsContinew,UnexpecteError,Token)
				values(@EmpId,GETDATE(),null,1,'',@Token)
			end
		end
		else
		begin
			set @Token=NEWID();
			select *,1 as Authorised,@Token as Token from #TmpLoginUser
			insert into tblLoginDetails
			(UserId,LoginTime,LogOutTime,IsContinew,UnexpecteError,Token)
			values(@EmpId,GETDATE(),null,1,'',@Token)
		end
	end
	drop table #TmpLoginUser
END