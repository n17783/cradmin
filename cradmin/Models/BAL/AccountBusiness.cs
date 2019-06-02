using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class AccountBusiness
    {
        public LoginResponse VerifyUserLogin(LoginViewModel model)
        {
            LoginResponse objLoginDetails = new LoginResponse();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName= "@UserName" ,Value=model.Email});
            lst.Add(new SqlParameter() { ParameterName = "@Password",Value=model.Password });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt=objHelper.GetDataTable("GetLogginDetails", lst);
            var response=dt.ToList<LoginResponse>();
            if (response.Count==0)
            {
                objLoginDetails.Authorised = 0;
                objLoginDetails.Status = 0;
                objLoginDetails.ErrorMessage = "Invalid User name or password";
            }
            else
            {
                objLoginDetails = response[0];
                objLoginDetails.Pssword = "";
            }
            return objLoginDetails;
        }

    }
}