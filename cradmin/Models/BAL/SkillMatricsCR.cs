using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class SkillMatricsCR
    {
        public SkillType Save(SkillType model)
        {
            SkillType ObjSkillType = new SkillType();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@SkillCreationId", Value = model.SkillCreationId });
            lst.Add(new SqlParameter() { ParameterName = "@EmpTypeId", Value = model.EmpTypeId });

            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Insert_SkillMaster", lst);

            ObjSkillType.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            return ObjSkillType;
        }

        public List<SkillType> GetSkillTypeList(SkillType model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Get_SkillList", lst);
            return dt.ToList<SkillType>();
        }

    }
}