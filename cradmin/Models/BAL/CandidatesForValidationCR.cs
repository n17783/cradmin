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
            lst.Add(new SqlParameter() { ParameterName = "@VAssRemarkOne", Value = model.RemartkOne=="" ? null:model.RemartkOne });
            lst.Add(new SqlParameter() { ParameterName = "@VAssRemarkTow", Value = model.RemartkTwo==""?null:model.RemartkTwo });
            lst.Add(new SqlParameter() { ParameterName = "@VAssessmentNo", Value = model.AssessmentID=="" ? null: model.AssessmentID });


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

        public string SaveTrainingProcessDetails(TrainingProcessDetailsModel model)
        {
            List<SqlParameter> lst = new List<SqlParameter>();

            SettingsHelper objHelper = SettingsHelper.Instance;

            lst.Add(new SqlParameter() { ParameterName = "@BTrainingId", Value = model.BTrainingId });
            lst.Add(new SqlParameter() { ParameterName = "@EmpDetailsId", Value = model.EmpDetailsId });
            lst.Add(new SqlParameter() { ParameterName = "@BTTekenBy", Value = model.BTTekenBy });

            lst.Add(new SqlParameter() { ParameterName = "@ExmSInductionName", Value = model.ExmSInductionName });
           // lst.Add(new SqlParameter() { ParameterName = "@ExmSInductionDate", Value = model.ExmSInductionDate });
            lst.Add(new SqlParameter() { ParameterName = "@ExmSInductionMarks", Value = model.ExmSInductionMarks });
            lst.Add(new SqlParameter() { ParameterName = "@ExmSInductionPassFail", Value = model.ExmSInductionPassFail });
            lst.Add(new SqlParameter() { ParameterName = "@ExmCSpaceName", Value = model.ExmCSpaceName });
          //  lst.Add(new SqlParameter() { ParameterName = "@ExmCSpaceDate", Value = model.ExmCSpaceDate });
            lst.Add(new SqlParameter() { ParameterName = "@ExmCSpaceMarks", Value = model.ExmCSpaceMarks });
            lst.Add(new SqlParameter() { ParameterName = "@ExmCSpacePassFail", Value = model.ExmCSpacePassFail });
            lst.Add(new SqlParameter() { ParameterName = "@ExmWAtHightName", Value = model.ExmWAtHightName });
          //  lst.Add(new SqlParameter() { ParameterName = "@ExmWAtHightDate", Value = model.ExmWAtHightDate });
            lst.Add(new SqlParameter() { ParameterName = "@ExmWAtHightMarks", Value = model.ExmWAtHightMarks });
            lst.Add(new SqlParameter() { ParameterName = "@ExmWAtHightPassFail", Value = model.ExmWAtHightPassFail });
            

            DataTable dt = objHelper.GetDataTable("SaveTrainingProcessDetails", lst);

            var retList = dt.Rows[0]["Result"].ToString();
            return retList;
        }
    }
}