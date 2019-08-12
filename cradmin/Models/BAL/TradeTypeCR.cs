using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class TradeTypeCR
    {
        public TradeType Save(TradeType model)
        {
            TradeType objTradeType = new TradeType();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@TradDescription", Value = model.TradDescription });
            lst.Add(new SqlParameter() { ParameterName = "@TradeCId", Value = model.TradeCId });
          
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Insert_Trade", lst);

            objTradeType.Status = dt.Rows.Count>0?Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()):0;
            return objTradeType;
        }

        public List<TradeType> GetTradeTypeList(TradeType model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Get_TradeList", lst);
            return dt.ToList<TradeType>();
        }
    }
}