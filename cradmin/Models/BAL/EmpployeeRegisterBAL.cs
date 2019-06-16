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
            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            DataTable dtzone = objHelper.GetDataTable("Get_Zone_Details", lst);

            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });

            DataTable dtValidattionAgency = objHelper.GetDataTable("GetValidationAgencyList", lst);
            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });

            DataTable dtEmployeeTypeList = objHelper.GetDataTable("GetEmployeeTypeList", lst);
            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });

            DataTable dtContractorList = objHelper.GetDataTable("GetMainContractorList", lst);
            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });

            response.ZoneList = dtzone.ToList<DeptZoneMaster>();
            response.TradeCategoryList = dt.ToList<TradeCategory>();
            response.ValidationAgencyList = dtValidattionAgency.ToList<ValidationAgency>();
            response.EmployeeTypeList = dtEmployeeTypeList.ToList<EmployeeType>();
            response.ContractorList = dtContractorList.ToList<MainContractor>();
            response.Status = 1;
            return response;
        }
    }
}