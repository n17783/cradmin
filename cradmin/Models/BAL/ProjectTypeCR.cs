using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class ProjectTypeCR
    {
        public ProjectType Save(ProjectType model)
        {
            ProjectType objProjectType = new ProjectType();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@ProjectTypeDescription", Value = model.ProjectTypeDescription });
            lst.Add(new SqlParameter() { ParameterName = "@PTEntryBy", Value = model.PTEntryBy });
            lst.Add(new SqlParameter() { ParameterName = "@CreatedBy", Value = model.CreatedBy });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Insert_ProjectType", lst);
            objProjectType.Status = 1;
            return objProjectType;
        }

        public List<ProjectType> GetProjectTypeList(ProjectType model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Get_ProjectType", lst);
            return dt.ToList<ProjectType>();
        }
    }
}