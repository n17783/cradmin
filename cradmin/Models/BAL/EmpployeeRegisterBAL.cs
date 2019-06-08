using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class EmpployeeRegisterBAL
    {
        public MasterDataResponse GetMasterData()
        {
            MasterDataResponse response = new MasterDataResponse();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("get_trade_category", lst);
            DataTable dtzone = objHelper.GetDataTable("Get_Zone_Details", lst);
            DataTable dtValidattionAgency = objHelper.GetDataTable("Get_Validation_Agency", lst);
            DataTable dtEmployeeTypeList = objHelper.GetDataTable("Get_EmpType", lst);
            DataTable dtContractorList = objHelper.GetDataTable("Get_Contractor", lst);
            response.ZoneList = dtzone.ToList<DeptZoneMaster>();
            response.TradeList= dt.ToList<TradeCategory>();
            response.ValidationAgencyList = dtValidattionAgency.ToList<ValidationAgency>();
            response.EmployeeTypeList = dtEmployeeTypeList.ToList<EmployeeType>();
            response.ContractorList = dtEmployeeTypeList.ToList<MainContractor>();
            return response;
        }
    }
}