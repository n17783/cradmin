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
            DataTable dtCountryList = objHelper.GetDataTable("Get_CountryList", lst);

            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@CountryId", Value = DBNull.Value });
            DataTable dtStateList = objHelper.GetDataTable("Get_StateList", lst);

            lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = DBNull.Value });
            lst.Add(new SqlParameter() { ParameterName = "@StateId", Value = DBNull.Value });
            DataTable dtCityList = objHelper.GetDataTable("Get_CityList", lst);

            response.CityList = dtCityList.ToList<CityMaster>();
            response.StateList = dtStateList.ToList<StateMaster>();
            response.CountryList = dtCountryList.ToList<CountryMaster>();
            response.ZoneList = dtzone.ToList<DeptZoneMaster>();
            response.TradeCategoryList = dt.ToList<TradeCategory>();
            response.ValidationAgencyList = dtValidattionAgency.ToList<ValidationAgency>();
            response.EmployeeTypeList = dtEmployeeTypeList.ToList<EmployeeType>();
            response.ContractorList = dtContractorList.ToList<MainContractor>();
            response.Status = 1;
            return response;
        }

        internal MasterDataResponse RegisterEmployee(MasterDataResponse model)
        {
            MasterDataResponse response = new MasterDataResponse();
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@AdhaarNo", Value = model.Emp.AadharNo });
            lst.Add(new SqlParameter() { ParameterName = "@BloodGroup", Value = model.Emp.BloodGroup });
            lst.Add(new SqlParameter() { ParameterName = "@DOB", Value = model.Emp.DOB, DbType = DbType.DateTime });
            lst.Add(new SqlParameter() { ParameterName = "@EmpPhoto", Value = model.Emp.EmpPhoto });
            lst.Add(new SqlParameter() { ParameterName = "@FName", Value = model.Emp.FName });
            lst.Add(new SqlParameter() { ParameterName = "@Gender", Value = model.Emp.Gender });
            lst.Add(new SqlParameter() { ParameterName = "@LName", Value = model.Emp.LName });
            lst.Add(new SqlParameter() { ParameterName = "@MName", Value = model.Emp.MName });
            lst.Add(new SqlParameter() { ParameterName = "@PanNo", Value = model.Emp.PanNo });
            if (model.Emp.PkId!=null)
            {
                lst.Add(new SqlParameter() { ParameterName = "@PkId", Value = model.Emp.PkId });
            }
            lst.Add(new SqlParameter() { ParameterName = "@Regt_No", Value = model.Emp.Regt_No });
            lst.Add(new SqlParameter() { ParameterName = "@UserName", Value = model.Emp.UserName });
            lst.Add(new SqlParameter() { ParameterName = "@EmpTypeId", Value = model.EmpDetails.EmpTypeId });
            lst.Add(new SqlParameter() { ParameterName = "@JoiningStatus", Value = model.EmpDetails.JoiningStatus });
            lst.Add(new SqlParameter() { ParameterName = "@DateOfReport", Value = model.EmpDetails.DateOfReport });
            lst.Add(new SqlParameter() { ParameterName = "@ContractorId", Value = model.EmpDetails.ContractorId });
            lst.Add(new SqlParameter() { ParameterName = "@ContactNo", Value = model.EmpDetails.ContactNo });
            lst.Add(new SqlParameter() { ParameterName = "@EmrContactNo", Value = model.EmpDetails.EmrContactNo });
            lst.Add(new SqlParameter() { ParameterName = "@IdProofType", Value = model.EmpDetails.IdProofType });
            lst.Add(new SqlParameter() { ParameterName = "@IdProofNo", Value = model.EmpDetails.IdProofNo });
            lst.Add(new SqlParameter() { ParameterName = "@IdProofImage", Value = model.EmpDetails.IdProofImage });
            lst.Add(new SqlParameter() { ParameterName = "@PHouseNo", Value = model.EmpDetails.PHouseNo });
            lst.Add(new SqlParameter() { ParameterName = "@PVillageId", Value = model.EmpDetails.PVillageId });
            lst.Add(new SqlParameter() { ParameterName = "@PDisticId", Value = model.EmpDetails.PDisticId });
            lst.Add(new SqlParameter() { ParameterName = "@PTalukaId", Value = model.EmpDetails.PTalukaId });
            lst.Add(new SqlParameter() { ParameterName = "@PStateId", Value = model.EmpDetails.PStateId });
            lst.Add(new SqlParameter() { ParameterName = "@PCountryId", Value = model.EmpDetails.PCountryId });
            lst.Add(new SqlParameter() { ParameterName = "@PPincodeId", Value = model.EmpDetails.PPincodeId });
            lst.Add(new SqlParameter() { ParameterName = "@THouseNo", Value = model.EmpDetails.THouseNo });
            lst.Add(new SqlParameter() { ParameterName = "@TVillageId", Value = model.EmpDetails.TVillageId });
            lst.Add(new SqlParameter() { ParameterName = "@TDisticId", Value = model.EmpDetails.TDisticId });
            lst.Add(new SqlParameter() { ParameterName = "@TTalukaId", Value = model.EmpDetails.TTalukaId });
            lst.Add(new SqlParameter() { ParameterName = "@TStateId", Value = model.EmpDetails.TStateId });
            lst.Add(new SqlParameter() { ParameterName = "@TCountryId", Value = model.EmpDetails.TCountryId });
            lst.Add(new SqlParameter() { ParameterName = "@TPincode", Value = model.EmpDetails.TPincode });
            lst.Add(new SqlParameter() { ParameterName = "@ReJoineOrNewJoin", Value = model.EmpDetails.ReJoineOrNewJoin });
            lst.Add(new SqlParameter() { ParameterName = "@DeptZoneId", Value = model.EmpDetails.DeptZoneId });
            lst.Add(new SqlParameter() { ParameterName = "@RegistrationDate", Value = model.EmpDetails.RegistrationDate });
            lst.Add(new SqlParameter() { ParameterName = "@EntryBy", Value = model.EmpDetails.EntryBy });
            lst.Add(new SqlParameter() { ParameterName = "@EnteryDate", Value = model.EmpDetails.EnteryDate });
            lst.Add(new SqlParameter() { ParameterName = "@ValidationAgencyId", Value = model.EmpDetails.ValidationAgencyId });
            lst.Add(new SqlParameter() { ParameterName = "@IsAlreadyValidated", Value = model.EmpDetails.IsAlreadyValidated });
            lst.Add(new SqlParameter() { ParameterName = "@TradeId", Value = model.EmpDetails.TradeId });
            lst.Add(new SqlParameter() { ParameterName = "@AdhaarImage", Value = model.EmpDetails.AdhaarImage });
            lst.Add(new SqlParameter() { ParameterName = "@IsDMorStaff", Value = model.EmpDetails.IsDMorStaff });
            DataTable dtEmployee = objHelper.GetDataTable("Register_Employee", lst);
            response.EmpDetails = new EmployeeDetails();
            response.EmpDetails.PkId = Convert.ToInt32(dtEmployee.Rows[0]["PkId"]);
            response.EmpDetails.EmpDetailsId = Convert.ToInt32(dtEmployee.Rows[0]["EmpDetailsId"]);
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
                                UserName = Convert.ToString(tbl.GetField("UserName")),
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
                                PPincodeId = Convert.ToString(tbl.GetField("PPincodeId")),
                                PStateId = Convert.ToInt32(tbl.GetField("PStateId")),
                                PTalukaId = Convert.ToString(tbl.GetField("PTalukaId")),
                                PVillageId = Convert.ToString(tbl.GetField("PVillageId")),
                                RegistrationDate = Convert.ToDateTime(tbl.GetField("RegistrationDate")),
                                ReJoineOrNewJoin = Convert.ToBoolean(tbl.GetField("ReJoineOrNewJoin")),
                                TCountryId = Convert.ToInt32(tbl.GetField("TCountryId")),
                                TDisticId = Convert.ToInt32(tbl.GetField("TDisticId")),
                                THouseNo = Convert.ToString(tbl.GetField("THouseNo")),
                                AdhaarImage = Convert.ToString(tbl.GetField("AdhaarImage")),
                                TPincode = Convert.ToString(tbl.GetField("TPincode")),
                                TStateId = Convert.ToInt32(tbl.GetField("TStateId")),
                                TTalukaId = Convert.ToString(tbl.GetField("TTalukaId")),
                                TVillageId = Convert.ToString(tbl.GetField("TVillageId")),
                                ValidationAgencyId = Convert.ToInt32(tbl.GetField("ValidationAgencyId")),
                                TradeId = Convert.ToInt32(tbl.GetField("TradeId")),
                                IsAlreadyValidated = Convert.ToBoolean(tbl.GetField("IsAlreadyValidated")),
                                IsDMorStaff = Convert.ToBoolean(tbl.GetField("IsDMorStaff")),
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