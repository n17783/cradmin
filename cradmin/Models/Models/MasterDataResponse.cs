using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cradmin.Models.Models
{
    public class MasterDataResponse : Error
    {
        public MasterDataResponse()
        {
            TradeList = new List<TradeType>();
            SubContractorList = new List<SubContractor>();
            ContractorList = new List<MainContractor>();
            ValidationAgencyList = new List<ValidationAgency>();
            EmployeeTypeList = new List<EmployeeType>();
            ZoneList = new List<DeptZoneMaster>();

            EmpExit = new EmployeeExit();
            Emp = new Employee();
            EmpDetails = new EmployeeDetails();
            StateList = new List<StateMaster>();
            CityList = new List<CityMaster>();
            CountryList = new List<CountryMaster>();
            DeptList = new List<DeptNames>();
            ProjectTypeList = new List<ProjectType>();
        }

        public List<CityMaster> CityList { get; set; }

        public List<CountryMaster> CountryList { get; set; }

        public List<StateMaster> StateList { get; set; }

        public List<DeptZoneMaster> ZoneList { get; set; }

        public List<TradeType> TradeList { get; set; }

        public List<MainContractor> ContractorList { get; set; }
        public List<SubContractor> SubContractorList { get; set; }
        public List<ValidationAgency> ValidationAgencyList { get; set; }
        public List<ProjectType> ProjectTypeList { get; set; }
        public List<EmployeeType> EmployeeTypeList { get; set; }
        public List<DeptNames> DeptList { get; set; }
        public EmployeeExit EmpExit { get; set; }
        public Employee Emp { get; set; }
        public EmployeeDetails EmpDetails { get; set; }

    }
}