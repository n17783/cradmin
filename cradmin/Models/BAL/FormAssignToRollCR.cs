using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class FormAssignToRollCR
    {
        RollFormMappingResponce objFormToRoll = new RollFormMappingResponce();
        SettingsHelper objHelper = SettingsHelper.Instance;

        public RollFormMappingResponce Save(RollFormMappResponce model)
        {
            try
            {
               
                List<SqlParameter> lst = new List<SqlParameter>();
                lst.Add(new SqlParameter() { ParameterName = "@RollFormMappingId", Value = model.RollFormMappingId });
                lst.Add(new SqlParameter() { ParameterName = "@RollId", Value = model.RollId });
                lst.Add(new SqlParameter() { ParameterName = "@allformid", Value =model.AllFormId });
                lst.Add(new SqlParameter() { ParameterName = "@EntryBy", Value = model.EntryBy });
                lst.Add(new SqlParameter() { ParameterName = "@AuthorisedBy", Value = model.AuthorisedBy });
                lst.Add(new SqlParameter() { ParameterName = "@discontinew", Value = model.@discontinew });

                SettingsHelper objHelper = SettingsHelper.Instance;

                DataTable dt = objHelper.GetDataTable("Insert_FormMappingToRoll", lst);

            objFormToRoll.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            return objFormToRoll;
        }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public RollFormMappingResponce GetMasterData()
        {
            RollFormMappingResponce response = new RollFormMappingResponce();
            DataTable dtRollList = objHelper.GetDataTable("GetRoleListForFormAssign");
            DataTable dtFormList = objHelper.GetDataTable("GetFormForAssign");
            response.RollList = dtRollList.ToList<RollModel>();
            response.FormList = dtFormList.ToList<FormResponce>();
            response.Status = 1;
            return response;
        }
        public List<RollFormMappResponce> GetFormToRoll(RollFormMappResponce model)
        {
            DataTable dtFormToRollList = new DataTable();
            List<RollFormMappResponce> lstrespose = new List<RollFormMappResponce>();
            try
            {
                List<SqlParameter> lst = new List<SqlParameter>();
                lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
                lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
                lst.Add(new SqlParameter() { ParameterName = "@Prefix", Value = model.Prefix });
                SettingsHelper objHelper = SettingsHelper.Instance;
                dtFormToRollList= objHelper.GetDataTable("Get_FormMappingToRoll", lst);
                lstrespose= dtFormToRollList.ToList<RollFormMappResponce>();
            }
            catch (Exception ex)
            {
                
            }
            return lstrespose;
        }

    }
}