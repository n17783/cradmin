using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class SubContractorCR
    {
        SettingsHelper objHelper = SettingsHelper.Instance;
        SubContractor objSubContractor = new SubContractor();
        public SubContractor Save(SubContractor model)
        {
            try
            {
                SubContractor objSubContractor = new SubContractor();
                List<SqlParameter> lst = new List<SqlParameter>();
                lst.Add(new SqlParameter() { ParameterName = "@SubCName", Value = model.SubCName });
                lst.Add(new SqlParameter() { ParameterName = "@SubCCompanyName", Value = model.SubCCompanyName });
                lst.Add(new SqlParameter() { ParameterName = "@SubCRegistrationNo", Value = model.SubCRegistrationNo });
                lst.Add(new SqlParameter() { ParameterName = "@SubCGstNo", Value = model.SubCGstNo });
                lst.Add(new SqlParameter() { ParameterName = "@SubCOfficeAddress", Value = model.SubCOfficeAddress });
                lst.Add(new SqlParameter() { ParameterName = "@SubCPhoneNo", Value = model.SubCPhoneNo });

                lst.Add(new SqlParameter() { ParameterName = "@ContractorPhoneNo1", Value = model.ContractorPhoneNo1 });
                lst.Add(new SqlParameter() { ParameterName = "@EmailId", Value = model.EmailId });
                lst.Add(new SqlParameter() { ParameterName = "@Code", Value = model.Code });
                lst.Add(new SqlParameter() { ParameterName = "@NatureOfWork", Value = model.NatureOfWork });
                lst.Add(new SqlParameter() { ParameterName = "@WorkOrderNo", Value = model.WorkOrderNo });
                lst.Add(new SqlParameter() { ParameterName = "@ValidUpTo", Value = model.ValidUpTo });
                lst.Add(new SqlParameter() { ParameterName = "@ContractorId", Value = model.ContractorId });
                lst.Add(new SqlParameter() { ParameterName = "@SubContractorId", Value = model.SubContractorId });

                SettingsHelper objHelper = SettingsHelper.Instance;
                DataTable dt = objHelper.GetDataTable("InsertSubContractor", lst);
                objSubContractor.Status =  Convert.ToInt32(dt.Rows[0]["SuccessFailed"].ToString());
                return objSubContractor;
            }
            catch (Exception ex)
            {

                throw ex;
            }
           
        }

        public List<SubContractor> GetSubContractorList(SubContractor model)
        {
            List<SubContractor> lstresult = new List<SubContractor>();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("Get_SubContractor", lst);
            lstresult=dt.ToList<SubContractor>();
            return lstresult;
        }
        public MasterDataResponse GetMasterData()
        {
            MasterDataResponse response = new MasterDataResponse();
            DataTable dtMainContractor = objHelper.GetDataTable("Get_Contractor");
           response.ContractorList = dtMainContractor.ToList<MainContractor>();
           
            response.Status = 1;
            return response;
        }

    }
}