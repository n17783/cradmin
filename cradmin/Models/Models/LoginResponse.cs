using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cradmin.Models.Models
{
    public class LoginResponse : Error
    {
        public int PkId { get; set; }
        public string Regt_No { get; set; }
        public bool Gender { get; set; }
        public string FName { get; set; }
        public string MName { get; set; }
        public string LName { get; set; }
        public DateTime DOB { get; set; }
        public string BloodGroup { get; set; }
        public string AadharNo { get; set; }
        public string EmpPhoto { get; set; }
        public string PanNo { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int EntryBy { get; set; }
        public int ExitBy { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime ExitDate { get; set; }
        public string ResonForDesignation { get; set; }
        public string ResonForExitRoll { get; set; }
        public bool IsContinew { get; set; }
        public string Pssword { get; set; }
        public int RollId { get; set; }
        public int EmployeeId { get; set; }
        public int Authorised { get; set; }
        public Guid Token { get; set; }

    }
    public class WorkHoldDetail:Error
    {
        public int EmpWorkDetailsId { get; set; }
        public int EmpDetailsId { get; set; }
        public int SubContractorId { get; set; }
        public int PSubContractorId { get; set; }
        public int ProjectTypeId { get; set; }
        public int PProjectTypeId { get; set; }
        public int PlantId { get; set; }
        public int PPlantId { get; set; }
        public int TradeId1 { get; set; }
        public int PTradeId1 { get; set; }
        public int TradeId2 { get; set; }
        public int PTradeId2 { get; set; }
        public int TradeId3 { get; set; }
        public int PTradeId3 { get; set; }
        public int WorkAndSalaryConditionId { get; set; }
        public int PWorkAndSalaryConditionId { get; set; }
        public int DeptId { get; set; }
        public int PDeptId { get; set; }
        public string EpNo { get; set; }
        public string CsmNo { get; set; }
        public string EpNoChangeReson { get; set; }
        public string CsmNoChangeReson { get; set; }
        public DateTime UnderDate { get; set; }
        public DateTime ExitDate { get; set; }
        public int EntryBy { get; set; }
        public int ExitBy { get; set; }
        public bool FlagDone { get; set; }
        public bool HoldIsContinew { get; set; }
        public DateTime PassReceiveDate { get; set; }
        public DateTime PassIssueDate { get; set; }
        public string Remarks { get; set; }
        public DateTime EnteryDate { get; set; }
        public string PermissionBy { get; set; }
        public DateTime HoldLastUpdateDate { get; set; }
        public string TradeName1 { get; set; }
        public string TradeName2 { get; set; }
        public string TradeName3 { get; set; }
        public string Dept_Name { get; set; }
        public string SubCCompanyName { get; set; }
        public string ProjectTypeDescription { get; set; }
         public string PlantTitle { get; set; }
        public DateTime SalaryNegosiatedDate { get; set; }
        public string Flag1 { get; set; }
        public string FullName { get; set; }
        public string AadharNo { get; set; }
        public string EmpDesignation { get; set; }


    }
    public class SalWorkCondition:Error
    {
        public int WorkAndSalaryConditionId { get; set; }
        public int EmpDetailsId { get; set; }
        public string WorkingCondition { get; set; }
        public float Salary { get; set; }
        public bool LeaveApplicable { get; set; }
        public bool Allowance { get; set; }
        public bool HRA { get; set; }
        public bool Accommodation { get; set; }
        public bool AreUWillToTravel { get; set; }
        public int EntryBy { get; set; }
        public DateTime EntryDate { get; set; }
        public int StopBy { get; set; }
        public DateTime StopDate { get; set; }
        public string ResonForStop { get; set; }
        public DateTime SalaryNegosiatedDate { get; set; }
        public bool IsContinew { get; set; }
        public string Flag1 { get; set; }
    }
    public class DMJoining:Error
    {
        public int DMJoiningId { get; set; }
        public int EmpDetailsId { get; set; }
        public DateTime DmJoiningDate { get; set; }
        public bool SalaryFinalization { get; set; }
        public bool Biometric { get; set; }
        public bool AddPhotos { get; set; }
        public bool JobApplicationLetter { get; set; }
        public bool BankForm { get; set; }
        public bool FormNo35 { get; set; }
        public bool FormNo2 { get; set; }
        public bool FormNo11 { get; set; }
        public bool CsmCard { get; set; }
        public bool OfferLater { get; set; }
        public bool IsPassIssue { get; set; }
        public bool DeploymenForm { get; set; }
        public bool HasBankAccountOpen { get; set; }
        public int EntryBy { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsSaftyShoesIssue { get; set; }
        public bool IsTradeValidationPass { get; set; }
        public bool IsSefetyInductionDone { get; set; }
        public bool IsWorkAtHightDone { get; set; }
        public bool IsConfinedspaceDone { get; set; }
        public bool IsNomineeDetailsDone { get; set; }
        public string FullName { get; set; }
        public string AadharNo { get; set; }
        public string EmpDesignation { get; set; }
        public string Flag1 { get; set; }
        public bool ContractualPermenant { get; set; }
        public string DurationTypeM_Y { get; set; }
        public string Duration { get; set; }
        public DateTime? ContractualEndDate { get; set; }
        public DateTime StaffExitDate { get; set; }
    }

    public class Staff : Error
    {
       

        public int UserId { get; set; }

        public string FName { get; set; }

        public string MName { get; set; }

        public string LName { get; set; }

        public string AadharNo { get; set; }

        public bool IsExit { get; set; }

        public int PkId { get; set; }

        public int EmpDetailsId { get; set; }

        public bool IsDMorStaff { get; set; }

        public int RollId { get; set; }

        public string ContactNo { get; set; }

    }
    public class Employee : Error
    {
        public int? PkId { get; set; }
        public string Regt_No { get; set; }
        public bool? Gender { get; set; }
        public string FName { get; set; }
        public string MName { get; set; }
        public string LName { get; set; }
        public DateTime? DOB { get; set; }
        public string BloodGroup { get; set; }
        public string EmpPhoto { get; set; }
        public string PanNo { get; set; }
        public string AadharNo { get; set; }
        public string UserName { get; set; }

    }
    public class EmpBankDetails : Error
    {
        public int EmpBankDetailsId { get; set; }
        public string BankBranchName { get; set; }
        public string BankAccountNo { get; set; }
        public string AccountHolderName { get; set; }
        public int PkId { get; set; }
        public string IfscCode { get; set; }
        public bool IsContinew { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime ExitDate { get; set; }
        public string ResonforExit { get; set; }
        public string GiveOtherAccountReson { get; set; }
        public int EntryBy { get; set; }
        public int IsEBD { get; set; }

    }
    public class EmpFamilyDetails : Error
    {
        public int EmpFamilyDetailsId { get; set; }
        public int PkId { get; set; }
        public string FMemberName { get; set; }
        public string RelationId { get; set; }
        public bool Dependent { get; set; }
        public DateTime DOB { get; set; }
        public int EntryBy { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsContinew { get; set; }
        public string Remarks { get; set; }
        public bool Nominee { get; set; }
        public string Address { get; set; }
        public int IsFD { get; set; }
    }
        public class TradeMapping : Error
        {
            public int MappingId { get; set; }
            public int TradeId { get; set; }
            public int ValidationAgencyId { get; set; }
            public DateTime MappingDate { get; set; }
            public int DeptZoneId { get; set; }
            public int CreatedBy { get; set; }
            public DateTime CreatedDate { get; set; }
            public bool IsDelete { get; set; }
            public bool IsAlreadyValidated { get; set; }
            public int EmpDetailsId { get; set; }
            public string VCertificatePath { get; set; }
            public int ProjectTypeId { get; set; }
            public int ContractorId { get; set; }


        }

        public class CountryMaster
        {
            public int ContryId { get; set; }

            public string ContryName { get; set; }
        }

        public class StateMaster
        {
            public int StateId { get; set; }

            public string StateName { get; set; }

            public string CountryName { get; set; }

            public int ContryId { get; set; }
        }

        public class CityMaster
        {
            public int DTCVId { get; set; }

            public string StateName { get; set; }

            public string DTCVName { get; set; }

            public int SateId { get; set; }
        }

        public class EmployeeExit
        {
            public int? EmpExitId { get; set; }
            public int? EmpDetailsId { get; set; }
            public DateTime? LastWorkingDate { get; set; }
            public DateTime? ClearenceExitDateTime { get; set; }
            public bool? BiometricDeactivation { get; set; }
            public bool? ExitClearenceSubmited { get; set; }
            public string LeftReason { get; set; }
            public string LeftReasonRemarks { get; set; }
            public bool? StoreClearence { get; set; }
            public bool? NoticePeriodYes { get; set; }
            public bool? IfNotiRecoverNoticePay { get; set; }
            public DateTime? CancelDate { get; set; }
            public string FAndFStatus { get; set; }
            public bool? IsExit { get; set; }
            public int? EntryBy { get; set; }
            public DateTime? EntryDate { get; set; }
            public string ExitByAuthority { get; set; }
        }

        public class EmployeeDetails
        {public int EmpDId { get; set; }
            public int? EmpDetailsId { get; set; }
            public int? PkId { get; set; }
            public int? EmpTypeId { get; set; }
            public bool? JoiningStatus { get; set; }
            public DateTime? DateOfReport { get; set; }
            public int? ContractorId { get; set; }
            public string ContactNo { get; set; }
            public string EmrContactNo { get; set; }
            public string IdProofType { get; set; }
            public string IdProofNo { get; set; }
            public string IdProofImage { get; set; }
            public string PHouseNo { get; set; }
            public string EmpPhoto { get; set; }
            public string PVillageId { get; set; }
            public int? PDisticId { get; set; }
            public string PTalukaId { get; set; }
            public int? PStateId { get; set; }
            public int? PCountryId { get; set; }
            public string PPincodeId { get; set; }
            public string THouseNo { get; set; }
            public string TVillageId { get; set; }
            public int? TDisticId { get; set; }
            public string TTalukaId { get; set; }
            public int? TStateId { get; set; }
            public int? TCountryId { get; set; }
            public string TPincode { get; set; }
            public bool ReJoineOrNewJoin { get; set; }
            public int? DeptZoneId { get; set; }
            public DateTime? RegistrationDate { get; set; }
            public int? EntryBy { get; set; }
            public DateTime? EnteryDate { get; set; }

            public int? ValidationAgencyId { get; set; }
            public bool? IsAlreadyValidated { get; set; }
            public int? TradeId { get; set; }
            public string AdhaarImage { get; set; }
            public bool IsDMorStaff { get; set; }
            public int DeptId { get; set; }
            public int ProjectTypeId { get; set; }
            public string VCertificatePath { get; set; }
            public string EmpEmail { get; set; }
        }

        public class DeptZoneMaster : Error
        {
            public int DeptZoneId { get; set; }
            public string DeptZoneDescription { get; set; }
            public string DeptZoneAddress { get; set; }
            public string ContactNo { get; set; }
            public DateTime EntryDate { get; set; }
            public int EntryBy { get; set; }
            public DateTime ExitDate { get; set; }
            public int ExitBy { get; set; }
            public bool IsContinew { get; set; }
        }

        public class TradeCategory : Error
        {
            public int TradeCId { get; set; }
            public string TradCDescription { get; set; }
            public DateTime TCEntryDate { get; set; }
            public bool IsDelete { get; set; }
            public DateTime CreateDate { get; set; }
        }

        public class EmployeeType : Error
        {
            public int EmpTypeId { get; set; }
            public string EmpDesignation { get; set; }
            public bool IsDmOrStaff { get; set; }
            public string EmpGrade { get; set; }
            public string Category { get; set; }

        }
        public class SkillType : Error
        {
            public int SkillId { get; set; }
            public string SkillTitle { get; set; }
            public int EmpTypeId { get; set; }
            public string EmpDesignation { get; set; }
            public int SkillCreationId { get; set; }
        }


        public class ValidationAgency : Error
        {
            public int ValidationAgencyId { get; set; }
            public string AgencyDescription { get; set; }
            public string AgencyAddress { get; set; }
            public string AgencyContactNo { get; set; }
            public int isContinew { get; set; }
        }

        public class ProjectType : Error
        {
            public int ProjectTypeId { get; set; }
            public string ProjectTypeDescription { get; set; }

        }

        public class MainContractor : Error
        {
            public int ContractorId { get; set; }
            public string ContractorName { get; set; }
            public string ContractorCompanyName { get; set; }
            public string ContractorRegistrationNo { get; set; }
            public string ContractorGstNo { get; set; }
            public string ContractorOfficeAddress { get; set; }
            public string ContractorPhoneNo { get; set; }

        }
        public class SubContractor : Error
        {
            public int SubContractorId { get; set; }
            public int ContractorId { get; set; }
            public string ContractorCompanyName { get; set; }
            public string SubCName { get; set; }
            public string SubCCompanyName { get; set; }
            public string SubCRegistrationNo { get; set; }
            public string SubCGstNo { get; set; }
            public string SubCOfficeAddress { get; set; }
            public string SubCPhoneNo { get; set; }
            public string ContractorPhoneNo1 { get; set; }
            public string EmailId { get; set; }
            public string Code { get; set; }
            public string WorkOrderNo { get; set; }
            public string NatureOfWork { get; set; }
            public DateTime ValidUpTo { get; set; }
            public bool IsContinew { get; set; }
        }
        public class TradeType : Error
        {
            public int TradeId { get; set; }
            public int TradeCId { get; set; }
            public string TradDescription { get; set; }
            public string TradCDescription { get; set; }
            public int EmpDetailsId { get; set; }
            

    }
        public class StaffJoining : Error
        {
            public int StaffJoiningId { get; set; }
            public int EmpDetailsId { get; set; }
            public bool ContractualPermenant { get; set; }
            public string DurationTypeM_Y { get; set; }
            public string Duration { get; set; }
            public DateTime? ContractualEndDate { get; set; }
        public DateTime StaffJoiningDate { get; set; }
        public int EntryBy { get; set; }
            public DateTime EntryDate { get; set; }
            public bool AreUWillToTravel { get; set; }
            public bool EasilyWorkInCrAsia { get; set; }
            public string EasilyWorkInCrAsiaDeatils { get; set; }
            public string ReferBy { get; set; }
            public bool IsMedicalCheckUp { get; set; }
            public string MedicalRemarks { get; set; }
            public string HiringManager { get; set; }
            public string Reference1 { get; set; }
            public string Reference2 { get; set; }
            public string IdentificatOnMarks1 { get; set; }
            public string IdentificatOnMarks2 { get; set; }
            public DateTime StaffExitDate { get; set; }
            public string FullName { get; set; }
            public string AadharNo { get; set; }
            public string EmpDesignation { get; set; }
        
            public string Flag1 { get; set; }
    }

        public class DeptZone : Error
        {
            public int DeptZoneId { get; set; }
            public string DeptZoneDescription { get; set; }

            public string ContactNo { get; set; }
            public DateTime EntryDate { get; set; }
            public int EntryBy { get; set; }
            public DateTime ExitDate { get; set; }
            public int ExitBy { get; set; }
            public bool IsContinew { get; set; }
            public string ContactNo2 { get; set; }
            public string EmailId { get; set; }
            public string CreatedBy { get; set; }
            public string DeptZoneAddress { get; set; }
        }

        //public class RollModel : Error
        //{
        //    public int RollId { get; set; }
        //    public string RollDescription { get; set; }
        //    public int DeptId { get; set; }
        //    public string DeptName { get; set; }
        //    public string RollEntryDate { get; set; }
        //    public int RollEntryBy { get; set; }
        //    public string RollEntryByName { get; set; }

        //}

        public class ValidationAgencyModel : Error
        {
            public int ValidationAgencyId { get; set; }
            public string AgencyDescription { get; set; }
            public string AgencyAddress { get; set; }
            public string AgencyContactNo { get; set; }
            public bool isContinew { get; set; }

        }
        public class PlantTradeTracking : Error
        {
            public int PlantTradeTrackingId { get; set; }
            public int TradeId { get; set; }
            public int AuthorizedStrenth { get; set; }
            public string AuthorizedBy { get; set; }
            public DateTime AuthorizedDate { get; set; }
            public string PlantTitle { get; set; }
            public int EntryBy { get; set; }
            public int PlantId { get; set; }
            public bool IsContinew { get; set; }
            public string UnAuthorizedBy { get; set; }
            public DateTime UnAuthorizedDate { get; set; }
            public int ExitEntryBy { get; set; }
            public string TradDescription { get; set; }


        }
        public class PlantModel : Error
        {
            public int PlantId { get; set; }
            public string PlantTitle { get; set; }
            public string PlantDescription { get; set; }
            public string PlantIncharge { get; set; }
            public string PlantPhoneNo1 { get; set; }
            public int PlantStrenth { get; set; }
            public int DeptZoneId { get; set; }



        }
        public class DeptNames : Error
        {
            public int DeptId { get; set; }
            public string Dept_Name { get; set; }

        }
    }
