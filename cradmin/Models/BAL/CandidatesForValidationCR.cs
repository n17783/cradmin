using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace cradmin.Models.BAL
{
    public class CandidatesForValidationCR
    {
        public List<CandidatesForValidationModel> GetCandidatesForValidationList(CandidatesForValidationModel model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
            lst.Add(new SqlParameter() { ParameterName = "@PageNo", Value = model.PageNo });
            lst.Add(new SqlParameter() { ParameterName = "@PageSize", Value = model.PageSize });
            lst.Add(new SqlParameter() { ParameterName = "@getCandidates", Value = model.getCandidates });

            SettingsHelper objHelper = SettingsHelper.Instance;
            DataTable dt = objHelper.GetDataTable("GetCandidatesForValidationList", lst);
            return dt.ToList<CandidatesForValidationModel>();
        }
        
        public List<QuestionsModel> GetQuestionsList(CandidatesForValidationModel model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();
           
            SettingsHelper objHelper = SettingsHelper.Instance;
           
            lst.Add(new SqlParameter() { ParameterName = "@EmpDetailsId", Value = model.EmpDetailsId });
            lst.Add(new SqlParameter() { ParameterName = "@TestType", Value = model.TestType });

            DataTable dt = objHelper.GetDataTable("GetCandidatesForValidationQuestionsList", lst);

            var retList= dt.ToList<QuestionsModel>();
            return retList;
        }

        public string SaveValidatonProcess(ValidationInsertModal model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();

            SettingsHelper objHelper = SettingsHelper.Instance;

            lst.Add(new SqlParameter() { ParameterName = "@EmpValidationId", Value = model.EmpValidationId });
            lst.Add(new SqlParameter() { ParameterName = "@EmpDetailsId", Value = model.EmpDetailsId });            
            lst.Add(new SqlParameter() { ParameterName = "@TradeId", Value = model.TradeId });
            lst.Add(new SqlParameter() { ParameterName = "@TestType", Value = model.TestType });
            lst.Add(new SqlParameter() { ParameterName = "@TestTakenByEmpId", Value = model.TestTakenByEmpId });
            lst.Add(new SqlParameter() { ParameterName = "@TestTotalMarks", Value = model.TestTotalMarks });
            lst.Add(new SqlParameter() { ParameterName = "@TestObtainMarks", Value = model.TestObtainMarks });
            lst.Add(new SqlParameter() { ParameterName = "@TResult", Value = model.TResult });


            DataTable dt = objHelper.GetDataTable("SaveValidationProcessDetails", lst);

            var retList = dt.Rows[0]["Result"].ToString();
            return retList;
        }

        public List<AssessmentReportDetailsModel> GetAssessedReportDetails(ValidationInsertModal model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();

            SettingsHelper objHelper = SettingsHelper.Instance;

            lst.Add(new SqlParameter() { ParameterName = "@EmpValidationId", Value = model.EmpValidationId });
        

            DataTable dt = objHelper.GetDataTable("GetAssessedReportDetails", lst);

            var retList = dt.ToList<AssessmentReportDetailsModel>();
            return retList;
        }

        public string SaveAssessmentResultStatusDetails(AssessmentReportDetailsModel model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();

            SettingsHelper objHelper = SettingsHelper.Instance;

           
            lst.Add(new SqlParameter() { ParameterName = "@EmpValidationId", Value = model.EmpValidationId });
            lst.Add(new SqlParameter() { ParameterName = "@LoginEmployeeId", Value = 0 });
            lst.Add(new SqlParameter() { ParameterName = "@VAssRemarkOne", Value = model.RemartkOne });
            lst.Add(new SqlParameter() { ParameterName = "@VAssRemarkTow", Value = model.RemartkTwo });
            lst.Add(new SqlParameter() { ParameterName = "@VAssessmentNo", Value = model.AssessmentID });


            DataTable dt = objHelper.GetDataTable("SaveAssessmentReportDetails", lst);

            var retList = dt.Rows[0]["Result"].ToString();
            return retList;
        }

        public List<TrainingProcessDetailsModel> GetTrainingProcessDetails(CandidatesForValidationModel model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();

            SettingsHelper objHelper = SettingsHelper.Instance;

            lst.Add(new SqlParameter() { ParameterName = "@EmpDetailsId", Value = model.EmpDetailsId });


            DataTable dt = objHelper.GetDataTable("GetTrainingProcessDetails", lst);

            var retList = dt.ToList<TrainingProcessDetailsModel>();
            return retList;
        }
    }
}