using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class PlantTradeTrackingCR
    {
        PlantTradeTracking objPTTracking = new PlantTradeTracking();
        SettingsHelper objHelper = SettingsHelper.Instance;
       
        public PlantTradeTracking Save(PlantTradeTracking model)
        {
            
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PlantTradeTrackingId", Value = model.PlantTradeTrackingId });
            lst.Add(new SqlParameter() { ParameterName = "@AuthorizedStrenth", Value = model.AuthorizedStrenth });
            lst.Add(new SqlParameter() { ParameterName = "@AuthorizedBy", Value = model.AuthorizedBy });
            lst.Add(new SqlParameter() { ParameterName = "@AuthorizedDate", Value = model.AuthorizedDate });
           
            lst.Add(new SqlParameter() { ParameterName = "@TradeId", Value = model.TradeId });
            lst.Add(new SqlParameter() { ParameterName = "@PlantId", Value = model.PlantId });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Insert_PlantTradeTracking", lst);

            objPTTracking.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            return objPTTracking;
        }
        public PlantTradeStreanth GetMasterData()
        {
            PlantTradeStreanth response = new PlantTradeStreanth();
            //List<SqlParameter> lst = new List<SqlParameter>();
            //lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            //lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            DataTable dtPlantList = objHelper.GetDataTable("Get_PlantList");
           
            //lst = new List<SqlParameter>();
            //lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            //lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            DataTable dtTradeList = objHelper.GetDataTable("Get_TradeList");
            response.PlantList = dtPlantList.ToList<PlantModel>();
            response.TradeList = dtTradeList.ToList<TradeType>();
            response.Status = 1;
            return response;


            //DataTable dtPlantAuthorisedStreanth = objHelper.GetDataTable("Get_PlantAuthorizedStrenth", lst);
            //lst = new List<SqlParameter>();
            //lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            //lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });

            //DataTable dtEmployeeTypeList = objHelper.GetDataTable("GetEmployeeTypeList", lst);



            //response.EmployeeTypeList = dtEmployeeTypeList.ToList<EmployeeType>();
            // response.PlantTradeTrackingList = dtPlantAuthorisedStreanth.ToList<PlantTradeTracking>();

        }
        public List<PlantTradeTracking> GetPlantTradeStrenth(PlantTradeTracking model)
        {
            try
            {
                List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo});
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            lst.Add(new SqlParameter() { ParameterName = "@Prefix", Value = model.Prefix });
            SettingsHelper objHelper = SettingsHelper.Instance;
           
                DataTable dtPlantTradeTrackingList = objHelper.GetDataTable("Get_PlantAuthorizedStrenth", lst);
                return dtPlantTradeTrackingList.ToList<PlantTradeTracking>();
            }
            catch (Exception ex)
            {

                throw;
            }
           
           
           
            
            
        }
            
    }
}