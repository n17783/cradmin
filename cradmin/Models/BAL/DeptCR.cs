using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class DeptCR
    {
        public DeptNames save(DeptNames model)
        {
            DeptNames objdept = new DeptNames();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@Dept_Name", Value = model.Dept_Name });
          
            SettingsHelper objhelper = SettingsHelper.Instance;
            DataTable dt = objhelper.GetDataTable("InsertDepartment", lst);
            objdept.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            return objdept;
        }

        public List<DeptNames> GetDepartment(DeptNames model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("GetDeptList", lst);
            return dt.ToList<DeptNames>();
        }
    }
}