using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class DeptZoneCR
    {
        public DeptZone Save(DeptZone model)
        {
            DeptZone objDeptZone = new DeptZone();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@DeptZoneDescription", Value = model.DeptZoneDescription });
            lst.Add(new SqlParameter() { ParameterName = "@DeptZoneAddress", Value = model.DeptZoneAddress });
            lst.Add(new SqlParameter() { ParameterName = "@ContactNo", Value = model.ContactNo });
            lst.Add(new SqlParameter() { ParameterName = "@ContactNo2", Value = model.ContactNo2 });
            lst.Add(new SqlParameter() { ParameterName = "@EntryBy", Value = model.EntryBy });
            lst.Add(new SqlParameter() { ParameterName = "@EmailId", Value = model.EmailId });
            lst.Add(new SqlParameter() { ParameterName = "@CreatedBy", Value = model.CreatedBy });



            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Insert_DEPTandZONE", lst);

            objDeptZone.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            return objDeptZone;
        }
        public List<DeptZone> GetDeptZone(DeptZone model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("get_Deptzone", lst);
            return dt.ToList<DeptZone>();
        }
    }
}