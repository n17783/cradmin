using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class ValidationAgencyCR
    {
        public ValidationAgencyModel Save(ValidationAgencyModel model)
        {
            ValidationAgencyModel objContractor = new ValidationAgencyModel();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@AgencyDescription", Value = model.AgencyDescription });
            lst.Add(new SqlParameter() { ParameterName = "@AgencyAddress", Value = model.AgencyAddress });
            lst.Add(new SqlParameter() { ParameterName = "@AgencyContactNo", Value = model.AgencyContactNo });

            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("InsertValidationAgency", lst);
            objContractor.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            return objContractor;
        }

        public List<ValidationAgencyModel> GetValidationAgencyList(ValidationAgencyModel model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("GetValidationAgencyList", lst);
            return dt.ToList<ValidationAgencyModel>();
        }
    }
}