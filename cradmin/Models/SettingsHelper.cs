using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;

namespace cradmin.Models
{
    public class SettingsHelper
    {
        static SettingsHelper _Instance = null;
        private SettingsHelper()
        {

        }

        public static SettingsHelper Instance
        {
            get
            {
                if (_Instance==null)
                {
                    _Instance = new SettingsHelper();
                }
                return _Instance;
            }
        }

        public SqlConnection Connection
        {
            get
            {
                SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
                if (con.State==System.Data.ConnectionState.Closed)
                {
                    con.Open();
                }
                return con;
            }
        }


        public DataTable GetDataTable(string spName, List<SqlParameter> sqlParam = null)
        {
            DataTable ldt = new DataTable();
            //SqlConnection msqlcon = new SqlConnection(ConfigurationManager.ConnectionStrings["ApplicationServices"].ConnectionString);
            SqlCommand msqlcmd = new SqlCommand();

            msqlcmd.Connection = Connection;
            msqlcmd.CommandType = CommandType.StoredProcedure;
            msqlcmd.CommandText = spName;
            if (sqlParam != null)
            {
                if (sqlParam.Count > 0)
                {
                    for (int i = 0; i < sqlParam.Count; i++)
                    {
                        msqlcmd.Parameters.Add(sqlParam[i]);
                    }
                }
            }
            SqlDataAdapter msqlsda = new SqlDataAdapter(msqlcmd);
            msqlsda.Fill(ldt);
            msqlcmd.Parameters.Clear();
            return ldt;
        }
    }

    public class Error
    {
        public int Status { get; set; }
        // Status : 1=Success, 0=Failure, 2=Unauth
        public string ErrorMessage { get; set; }
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }

        public int LoginUserId { get; set; }
        public string Prefix { get; set; }
    }

    public static class Extensions
    {
        public static object GetField(this DataRow row, string ColumnName)
        {
            if (row[ColumnName]==DBNull.Value)
            {
                return null;
            }
            else
            {
                return row[ColumnName];
            }
        }

        public static List<T> ToList<T>(this DataTable table) where T : new()
        {
            IList<PropertyInfo> properties = typeof(T).GetProperties().ToList();
            List<T> result = new List<T>();

            foreach (var row in table.Rows)
            {
                var item = CreateItemFromRow<T>((DataRow)row, properties);
                result.Add(item);
            }

            return result;
        }

        private static T CreateItemFromRow<T>(DataRow row, IList<PropertyInfo> properties) where T : new()
        {
            T item = new T();
            foreach (var property in properties)
            {
                if (property.PropertyType == typeof(System.DayOfWeek))
                {
                    DayOfWeek day = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), row[property.Name].ToString());
                    property.SetValue(item, day, null);
                }
                else
                {
                    try
                    {
                        if (row[property.Name] == DBNull.Value)
                            property.SetValue(item, null, null);
                        else
                            property.SetValue(item, row[property.Name], null);
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            return item;
        }
    }
}