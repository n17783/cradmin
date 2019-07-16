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

            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@RollFormMappingId", Value = model.RollFormMappingId });
            lst.Add(new SqlParameter() { ParameterName = "@RollId", Value = model.RollId });
            lst.Add(new SqlParameter() { ParameterName = "@FormId", Value = model.FormId });
            lst.Add(new SqlParameter() { ParameterName = "@EntryBy", Value = model.EntryBy });
            lst.Add(new SqlParameter() { ParameterName = "@TradeId", Value = model.AuthorisedBy });
           
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Insert_FormMappingToRoll", lst);

             objFormToRoll.Status = dt.Rows.Count > 0 ? Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString()) : 0;
            return objFormToRoll;
        }
        public RollFormMappingResponce GetMasterData()
        {
            RollFormMappingResponce response = new RollFormMappingResponce();
            //List<SqlParameter> lst = new List<SqlParameter>();
            //lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            //lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            DataTable dtRollList = objHelper.GetDataTable("GetRoleList");

            //lst = new List<SqlParameter>();
            //lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            //lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
           DataTable dtFormList = objHelper.GetDataTable("GetFormForAssign");
            response.RollList = dtRollList.ToList<RollResponce>();
            response.FormList = dtFormList.ToList<FormResponce>();
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
        public List<RollFormMappResponce> GetFormToRoll(RollFormMappResponce model)
        {
            try
            {
                List<SqlParameter> lst = new List<SqlParameter>();
                lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
                lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
                lst.Add(new SqlParameter() { ParameterName = "@Prefix", Value = model.Prefix });
                SettingsHelper objHelper = SettingsHelper.Instance;

                DataTable dtFormToRollList = objHelper.GetDataTable("Get_FormMappingToRoll", lst);
                return dtFormToRollList.ToList<RollFormMappResponce>();
            }
            catch (Exception ex)
            {

                throw;
            }





        }

    }
}