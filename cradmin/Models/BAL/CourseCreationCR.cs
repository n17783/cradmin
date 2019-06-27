using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class CourseCreationCR
    {
        public CourseMasterResponse Save(CourseMasterResponse model)
        {
            CourseMasterResponse objcourse = new CourseMasterResponse();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@CourseDescription", Value = model.CourseDescription });
            lst.Add(new SqlParameter() { ParameterName = "@CourseCreatedBy", Value = model.CourseCreatedBy });
            lst.Add(new SqlParameter() { ParameterName = "@CourseTitle", Value = model.CourseTitle });
            lst.Add(new SqlParameter() { ParameterName = "@CourseSanctionDate", Value = model.CourseSanctionDate });
            lst.Add(new SqlParameter() { ParameterName = "@EntryBy", Value = 1 });
            

            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Insert_CourseMaster", lst);
           
            objcourse.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            return objcourse;
        }

        public List<CourseMasterResponse> GetCourseMasterList(CourseMasterResponse model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Get_CourseMasterList", lst);
            return dt.ToList<CourseMasterResponse>();
        }

    }
}