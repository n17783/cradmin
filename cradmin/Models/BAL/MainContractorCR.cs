using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class MainContractorCR
    {
        public MainContractor Save(MainContractor model)
        {
            MainContractor objContractor = new MainContractor();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@ContractorName", Value = model.ContractorName });
            lst.Add(new SqlParameter() { ParameterName = "@ContractorCompanyName", Value = model.ContractorCompanyName });
            lst.Add(new SqlParameter() { ParameterName = "@ContractorRegistrationNo", Value = model.ContractorRegistrationNo });
            lst.Add(new SqlParameter() { ParameterName = "@ContractorGstNo", Value = model.ContractorGstNo });
            lst.Add(new SqlParameter() { ParameterName = "@ContractorOfficeAddress", Value = model.ContractorOfficeAddress });
            lst.Add(new SqlParameter() { ParameterName = "@ContractorPhoneNo", Value = model.ContractorPhoneNo });

            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("InsertMainContractor", lst);
            objContractor.Status = 1;
            return objContractor;
        }

        public List<MainContractor> GetContractorList(MainContractor model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("GetMainContractorList", lst);
            return dt.ToList<MainContractor>();
        }
    }
}