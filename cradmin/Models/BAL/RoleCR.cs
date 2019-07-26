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
        public RoleModel Save(RoleModel model)
        {
            RoleModel objContractor = new RoleModel();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@RoleDescription", Value = model.RoleDescription });
            //lst.Add(new SqlParameter() { ParameterName = "@DeptId", Value = model.DeptId });
            lst.Add(new SqlParameter() { ParameterName = "@RoleEntryBy", Value = model.RoleEntryBy });

            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("InsertRole", lst);
            objContractor.Status = 1;
            return objContractor;
        }

        public List<RoleModel> GetRoleList(RoleModel model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("GetRoleList", lst);
            return dt.ToList<RoleModel>();
        }
    }
}