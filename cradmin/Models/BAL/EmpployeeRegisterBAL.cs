using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class EmpployeeRegisterBAL
    {
        SettingsHelper objHelper = SettingsHelper.Instance;
        public MasterDataResponse GetMasterData()
        {
            MasterDataResponse response = new MasterDataResponse();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            
            DataTable dt = objHelper.GetDataTable("get_trade_category", lst);
            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            DataTable dtzone = objHelper.GetDataTable("Get_Zone_Details", lst);

            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });

            DataTable dtValidattionAgency = objHelper.GetDataTable("GetValidationAgencyList", lst);
            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });

            DataTable dtEmployeeTypeList = objHelper.GetDataTable("GetEmployeeTypeList", lst);
            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });

            DataTable dtContractorList = objHelper.GetDataTable("GetMainContractorList", lst);
            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });

            response.ZoneList = dtzone.ToList<DeptZoneMaster>();
            response.TradeCategoryList = dt.ToList<TradeCategory>();
            response.ValidationAgencyList = dtValidattionAgency.ToList<ValidationAgency>();
            response.EmployeeTypeList = dtEmployeeTypeList.ToList<EmployeeType>();
            response.ContractorList = dtContractorList.ToList<MainContractor>();
            response.Status = 1;
            return response;
        }

        public MasterDataResponse CheckUserExist(Employee model)
        {
            MasterDataResponse response = new MasterDataResponse();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@AdhaarNo", Value = model.AadharNo });
            DataTable dtEmployeeDetails = objHelper.GetDataTable("Check_UserExist", lst);
            response = (from tbl in dtEmployeeDetails.AsEnumerable()
                        select new MasterDataResponse()
                        {
                            Emp = new Employee()
                            {
                                AadharNo = Convert.ToString(tbl.GetField("AadharNo")),
                                BloodGroup = Convert.ToString(tbl.GetField("BloodGroup")),
                                DOB = Convert.ToDateTime(tbl.GetField("DOB")),
                                EmpPhoto = Convert.ToString(tbl.GetField("EmpPhoto")),
                                FName = Convert.ToString(tbl.GetField("FName")),
                                Gender = Convert.ToBoolean(tbl.GetField("Gender")),
                                LName = Convert.ToString(tbl.GetField("LName")),
                                MName = Convert.ToString(tbl.GetField("MName")),
                                PanNo = Convert.ToString(tbl.GetField("PanNo")),
                                PkId = Convert.ToInt32(tbl.GetField("PkId")),
                                Regt_No = Convert.ToString(tbl.GetField("Regt_No")),
                            },
                            EmpDetails = new EmployeeDetails()
                            {
                                ContactNo = Convert.ToString(tbl.GetField("ContactNo")),
                                ContractorId = Convert.ToInt32(tbl.GetField("ContractorId")),
                                DateOfReport = Convert.ToDateTime(tbl.GetField("DateOfReport")),
                                DeptZoneId = Convert.ToInt32(tbl.GetField("DeptZoneId")),
                                EmpDetailsId = Convert.ToInt32(tbl.GetField("EmpDetailsId")),
                                EmpTypeId = Convert.ToInt32(tbl.GetField("EmpTypeId")),
                                EmrContactNo = Convert.ToString(tbl.GetField("EmrContactNo")),
                                EnteryDate = Convert.ToDateTime(tbl.GetField("EnteryDate")),
                                EntryBy = Convert.ToInt32(tbl.GetField("EntryBy")),
                                IdProofImage = Convert.ToString(tbl.GetField("IdProofImage")),
                                IdProofNo = Convert.ToString(tbl.GetField("IdProofNo")),
                                IdProofType = Convert.ToString(tbl.GetField("IdProofType")),
                                JoiningStatus = Convert.ToBoolean(tbl.GetField("JoiningStatus")),
                                PCountryId = Convert.ToInt32(tbl.GetField("PCountryId")),
                                PDisticId = Convert.ToInt32(tbl.GetField("PDisticId")),
                                PHouseNo = Convert.ToString(tbl.GetField("PHouseNo")),
                                PkId = Convert.ToInt32(tbl.GetField("PkId")),
                                PPincodeId = Convert.ToInt32(tbl.GetField("PPincodeId")),
                                PStateId = Convert.ToInt32(tbl.GetField("PStateId")),
                                PTalukaId = Convert.ToInt32(tbl.GetField("PTalukaId")),
                                PVillageId = Convert.ToInt32(tbl.GetField("PVillageId")),
                                RegistrationDate = Convert.ToDateTime(tbl.GetField("RegistrationDate")),
                                ReJoineOrNewJoin = Convert.ToBoolean(tbl.GetField("ReJoineOrNewJoin")),
                                TCountryId = Convert.ToInt32(tbl.GetField("TCountryId")),
                                TDisticId = Convert.ToInt32(tbl.GetField("TDisticId")),
                                THouseNo = Convert.ToInt32(tbl.GetField("THouseNo")),
                                TPincode = Convert.ToInt32(tbl.GetField("TPincode")),
                                TStateId = Convert.ToInt32(tbl.GetField("TStateId")),
                                TTalukaId = Convert.ToInt32(tbl.GetField("TTalukaId")),
                                TVillageId = Convert.ToInt32(tbl.GetField("TVillageId")),
                            },
                            EmpExit = new EmployeeExit()
                            {
                                IsExit = Convert.ToBoolean(tbl.GetField("IsExit"))
                            }
                        }).FirstOrDefault();
            return response;
        }
    }
}