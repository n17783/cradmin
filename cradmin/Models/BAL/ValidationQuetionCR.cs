using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class ValidationQuetionCR
    {

        TestQueCategory objPTTracking = new TestQueCategory();
        SettingsHelper objHelper = SettingsHelper.Instance;

        public TestQueCategory Save(TestQueCategory model)
        {
              List<SqlParameter> lst = new List<SqlParameter>();
                lst.Add(new SqlParameter() { ParameterName = "@TestId", Value = model.TestId });
                lst.Add(new SqlParameter() { ParameterName = "@TradeId", Value = model.TradeId });
                lst.Add(new SqlParameter() { ParameterName = "@TestQuetionCatagoryId", Value = model.TestQuetionCatagoryId });
                lst.Add(new SqlParameter() { ParameterName = "@TestQCategory", Value = model.TestQCategory });

                lst.Add(new SqlParameter() { ParameterName = "@TestQDescription", Value = model.TestQDescription });

                SettingsHelper objHelper = SettingsHelper.Instance;
                DataTable dt = objHelper.GetDataTable("Insert_TestQuetion", lst);

                objPTTracking.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            
          
           
            return objPTTracking;
        }
        public TestResponce GetMasterData()
        {
            TestResponce response = new TestResponce();
            DataTable dtTradCList = objHelper.GetDataTable("get_trade_category");
            DataTable dtTradeList = objHelper.GetDataTable("Get_TradeList");
            DataTable dtTestList = objHelper.GetDataTable("GetTestList");
            response.TradeCList = dtTradCList.ToList<TradeCategory>();
            response.TradeList = dtTradeList.ToList<TradeType>();
            response.TestList = dtTestList.ToList<TestCategory>();

            response.Status = 1;
            return response;
        }
        public List<TestQueCategory> GetQuetionList(TestQueCategory model)
        {
            List<TestQueCategory> lstresult = new List<TestQueCategory>();
            try
            {
                List<SqlParameter> lst = new List<SqlParameter>();
                lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
                lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
                lst.Add(new SqlParameter() { ParameterName = "@Prefix", Value = model.Prefix });
                SettingsHelper objHelper = SettingsHelper.Instance;

                DataTable dtTestQuetionList = objHelper.GetDataTable("Get_QuetionList", lst);
                lstresult = dtTestQuetionList.ToList<TestQueCategory>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return lstresult;
        }

    }
}