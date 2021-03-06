﻿using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class EmployeeTypeCR
    {
        public EmployeeType Save(EmployeeType model)
        {
            try
            {

           
            EmployeeType objEmployeeType = new EmployeeType();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@EmpDesignation", Value = model.EmpDesignation });
            lst.Add(new SqlParameter() { ParameterName = "@IsDmOrStaff", Value = model.IsDmOrStaff });
            lst.Add(new SqlParameter() { ParameterName = "@EmpGrade", Value = model.EmpGrade });
            lst.Add(new SqlParameter() { ParameterName = "@Category", Value = model.Category });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Insert_EmployeeType", lst);

            objEmployeeType.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            return objEmployeeType;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<EmployeeType> GetEmployeeTypeList(EmployeeType model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("GetEmployeeTypeList", lst);
            return dt.ToList<EmployeeType>();
        }
    }
}