using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class PlantCreationCR
    {
        public PlantModel save(PlantModel model)
        {
            model.PlantPhoneNo1 = string.IsNullOrEmpty(model.PlantPhoneNo1) ? "" : model.PlantPhoneNo1;
            model.PlantStrenth = string.IsNullOrEmpty(model.PlantStrenth.ToString()) ? 0 : model.PlantStrenth;
            PlantModel objplant = new PlantModel();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PlantId", Value = model.PlantId });
            lst.Add(new SqlParameter() { ParameterName = "@PlantIncharge", Value = model.PlantIncharge });
            lst.Add(new SqlParameter() { ParameterName = "@PlantDescription", Value = model.PlantDescription });
            lst.Add(new SqlParameter() { ParameterName = "@PlantTitle", Value = model.PlantTitle });
            lst.Add(new SqlParameter() { ParameterName = "@PlantStrenth", Value = model.PlantStrenth });
            lst.Add(new SqlParameter() { ParameterName = "@PlantPhoneNo1", Value = model.PlantPhoneNo1 });



            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Insert_Plant", lst);

            objplant.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            return objplant;

        }
        public List<PlantModel> GetPlantList(PlantModel model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Get_PlantList", lst);
            return dt.ToList<PlantModel>();
        }
    }
}