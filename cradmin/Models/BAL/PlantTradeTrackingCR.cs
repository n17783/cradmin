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
        public PlantTradeTracking Save(PlantTradeTracking model)
        {
            
            List<SqlParameter> lst = new List<SqlParameter>();
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
        public MasterDataResponse GetMasterData()
        {
            MasterDataResponse response = new MasterDataResponse();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dtPlantList = objHelper.GetDataTable("Get_PlantList", lst);
            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            DataTable dtTradeList = objHelper.GetDataTable("Get_TradeList", lst);
            response.PlantList = dtPlantList.ToList<PlantModel>();
            response.TradeList = dtTradeList.ToList<TradeType>();
            response.Status = 1;
            return response;
            //lst = new List<SqlParameter>();
            //lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            //lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });

            //DataTable dtPlantAuthorisedStreanth = objHelper.GetDataTable("Get_PlantAuthorizedStrenth", lst);
            //lst = new List<SqlParameter>();
            //lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            //lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });

            //DataTable dtEmployeeTypeList = objHelper.GetDataTable("GetEmployeeTypeList", lst);



            //response.EmployeeTypeList = dtEmployeeTypeList.ToList<EmployeeType>();
            // response.PlantTradeTrackingList = dtPlantAuthorisedStreanth.ToList<PlantTradeTracking>();

        }
        public MasterDataResponse GetPlantTradeStrenth()
        {
            MasterDataResponse response = new MasterDataResponse();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dtPlantTradeTrackingList = objHelper.GetDataTable("Get_PlantAuthorizedStrenth", lst);
           
            response.PlantTradeTrackingList = dtPlantTradeTrackingList.ToList<PlantTradeTracking>();
            
            response.Status = 1;
            return response;
        }
            
    }
}