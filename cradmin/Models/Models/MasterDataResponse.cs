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
            TradeList = new List<TradeCategory>();
            ContractorList = new List<MainContractor>();
            ValidationAgencyList = new List<ValidationAgency>();
            EmployeeTypeList = new List<EmployeeType>();
            ZoneList = new List<DeptZoneMaster>();

        }

        public List< DeptZoneMaster> ZoneList { get; set; }

        public List<TradeCategory> TradeList { get; set; }

        public List<MainContractor> ContractorList { get; set; }

        public List<ValidationAgency> ValidationAgencyList { get; set; }

        public List<EmployeeType> EmployeeTypeList { get; set; }
    }
}