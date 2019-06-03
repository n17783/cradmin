using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class TradeCategoryCR
    {
        public TradeCategory Save(TradeCategory model)
        {
            TradeCategory objLoginDetails = new TradeCategory();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@TradCDescription",Value=model.TradCDescription });
           
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Insert_Trade_Category", lst);
            objLoginDetails.Status = 1;
            return objLoginDetails;
        }

        public List< TradeCategory> GetTradeList(TradeCategory model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("get_trade_category", lst);
            return dt.ToList<TradeCategory>();
        }
    }
}