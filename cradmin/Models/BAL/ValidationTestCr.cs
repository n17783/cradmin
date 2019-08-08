using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class ValidationTestCr
    {

        public TestCategory Save(TestCategory model)
        {
            TestCategory objtestDetails = new TestCategory();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@TestDescription", Value = model.TestDescription });

            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("InsertValidationTest", lst);
            objtestDetails.Status = Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString());
            return objtestDetails;
        }

        public List<TestCategory> GetTestList(TestCategory model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(model.PageNo > 0 ? new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo } : new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(model.PageSize > 0 ? new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize } : new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("GetTestList", lst);
            return dt.ToList<TestCategory>();
        }
    }
}