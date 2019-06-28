using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cradmin.Models.Models
{
    public class MasterDataResponse:Error
    {
        public MasterDataResponse()
        {
            TradeCategoryList = new List<TradeCategory>();
            ContractorList = new List<MainContractor>();
            ValidationAgencyList = new List<ValidationAgency>();
            EmployeeTypeList = new List<EmployeeType>();
            ZoneList = new List<DeptZoneMaster>();
            PlantList = new List<PlantModel>();
            TradeList = new List<TradeType>();
            PlantTradeTrackingList = new List<PlantTradeTracking>();
            EmpExit = new EmployeeExit();
            Emp = new Employee();
            EmpDetails = new EmployeeDetails();

        }

        public List< DeptZoneMaster> ZoneList { get; set; }

        public List<TradeCategory> TradeCategoryList { get; set; }

        public List<MainContractor> ContractorList { get; set; }

        public List<ValidationAgency> ValidationAgencyList { get; set; }

        public List<EmployeeType> EmployeeTypeList { get; set; }
        public List<PlantTradeTracking> PlantTradeTrackingList { get; set; }
        public List<PlantModel> PlantList { get; set; }
        public List<TradeType> TradeList { get; set; }
        public EmployeeExit EmpExit { get; set; }
        public Employee Emp { get; set; }
        public EmployeeDetails EmpDetails { get; set; }

    }
}