﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cradmin.Models.Models
{
    public class MasterDataResponse : Error
    {
        public MasterDataResponse()
        {
            PlantList = new List<PlantModel>();
            DMJoiningList = new DMJoining();
            FTradeList = new TradeType();
               AssignTradeList = new List<TradeType>();
            FilterTradeList = new List<TradeType>();
            TradeList = new List<TradeType>();
            SubContractorList = new List<SubContractor>();
            ContractorList = new List<MainContractor>();
            ValidationAgencyList = new List<ValidationAgency>();
            EmployeeTypeList = new List<EmployeeType>();
            ZoneList = new List<DeptZoneMaster>();
            StaffJoiningList = new StaffJoining ();
            WorkHoldDetailList = new WorkHoldDetail();
            EmpExit = new EmployeeExit();
            Emp = new Employee();
            EmpDetails = new EmployeeDetails();
            StateList = new List<StateMaster>();
            CityList = new List<CityMaster>();
            CountryList = new List<CountryMaster>();
            DeptList = new List<DeptNames>();
            ProjectTypeList = new List<ProjectType>();
            RoleList = new List<RollModel>();
            StaffList = new List<Staff>();
            FamilyDetails = new EmpFamilyDetails();
            BankDetails = new EmpBankDetails();
        }

        public List<RollModel> RoleList { get; set; }
        public DMJoining DMJoiningList { get; set; }
        public WorkHoldDetail WorkHoldDetailList { get; set; }
        public List<Staff> StaffList { get; set; }

        public List<CityMaster> CityList { get; set; }
        public List<PlantModel> PlantList { get; set; }
        public List<CountryMaster> CountryList { get; set; }

        public List<StateMaster> StateList { get; set; }

        public List<DeptZoneMaster> ZoneList { get; set; }
        
        public List<TradeType> TradeList { get; set; }
        public List<TradeType> AssignTradeList { get; set; }
        public List<TradeType> FilterTradeList { get; set; }
        public StaffJoining StaffJoiningList { get; set; }
        public List<MainContractor> ContractorList { get; set; }
        public List<SubContractor> SubContractorList { get; set; }
        public List<ValidationAgency> ValidationAgencyList { get; set; }
        public List<ProjectType> ProjectTypeList { get; set; }
        public List<EmployeeType> EmployeeTypeList { get; set; }
        public List<DeptNames> DeptList { get; set; }
        public EmployeeExit EmpExit { get; set; }
        public Employee Emp { get; set; }
        public EmployeeDetails EmpDetails { get; set; }
        public EmpFamilyDetails FamilyDetails { get; set; }
        public EmpBankDetails BankDetails { get; set; }
        public TradeType FTradeList { get; set; }

    }
}