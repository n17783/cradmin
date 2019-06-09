using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cradmin.Models.Models
{
    public class LoginResponse: Error
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

    public class TradeCategory:Error
    {
        public int TradeCId { get; set; }
        public string TradCDescription { get; set; }
        public DateTime TCEntryDate { get; set; }
        public bool IsDelete { get; set; }
        public DateTime CreateDate { get; set; }
        public int TotalRecords { get; set; }
    }

    public class EmployeeType : Error
    {
        public int EmpTypeId { get; set; }
        public string EmpDesignation { get; set; }
        public string IsDmOrStaff { get; set; }
        public int EntryBy { get; set; }
        public DateTime EntryDate { get; set; }
        public string CreatedByAuthority { get; set; }
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
        public DateTime PTEnteryDate { get; set; }
        public int TotalRecords { get; set; }
    }
<<<<<<< Updated upstream

    public class MainContractor : Error
    {
        public int ContractorId { get; set; }
        public string ContractorName { get; set; }
        public string ContractorCompanyName { get; set; }
        public string ContractorRegistrationNo { get; set; }
        public string ContractorGstNo { get; set; }
        public string ContractorOfficeAddress { get; set; }
        public string ContractorPhoneNo { get; set; }
        public int TotalRecords { get; set; }
    }

=======
    public class TradeType : Error
    {
        public int TradeId { get; set; }
        public int TradeCId { get; set; }
        public string TradDescription { get; set; }
        public int TotalRecords { get; set; }
        public string TradCDescription { get; set; }
    }
    public class EmployeeType:Error
    {
        public string EmpDesignation { get; set; }
        public bool IsDmOrStaff { get; set; }
        public int EntryBy { get; set; }
        public DateTime EntryDate { get; set; }
        public string CreatedByAuthority { get; set; }
        public int EmpTypeId { get; set; }
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
>>>>>>> Stashed changes
}