using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class RoleCR
    {
        public RollModel Save(RollModel model)
        {
            RollModel objContractor = new RollModel();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@RollDescription", Value = model.RollDescription });
            lst.Add(new SqlParameter() { ParameterName = "@RollEntryBy", Value = 1 });

            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("InsertRole", lst);
            objContractor.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            return objContractor;
        }

        public List<RollModel> GetRoleList(RollModel model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("GetRoleList", lst);
            return dt.ToList<RollModel>();
        }
    }
}