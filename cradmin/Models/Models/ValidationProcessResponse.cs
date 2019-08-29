using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cradmin.Models.Models
{
    public class CandidatesForValidationModel : Error
    {
        public int SrNo { get; set; }
        public string PRN { get; set; }
        public string Adhar { get; set; }
        public string Name { get; set; }
        public string PhotoURL { get; set; }
        public string TradeCategory { get; set; }
        public string TradeName { get; set; }
        public string ProjectTypeName { get; set; }
        public string OralResult { get; set; }
        public string PracticalResult { get; set; }
        public string WrittenResult { get; set; }
        public int EmpDetailsId { get; set; }
        public string TestType { get; set; }
        public int EmpValidationId { get; set; }
        public string getCandidates { get; set; }
        public string TestResult { get; set; }
        public string ValidationDate { get; set; }
        public string AssessmentNo { get; set; }
        public string AssessmentDate { get; set; }
        public string ValidationAgency { get; set; }
        public string TraineeRegNo { get; set; }
        public int BTrainingId { get; set; }
    }


    public class QuestionsModel 
    {
        public string QuestionCategry { get; set; }
        public string QuestionId { get; set; }
        public string TestQDescription { get; set; }
        public string Mark { get; set; }
        public string TradId{ get; set; }
        public string TestId { get; set; }
        public string TestQPrefixLetter { get; set; }
        public string TestQuetionCatagoryId { get; set; }
        public string GroupName { get; set; }
        public string QuestionIndex { get; set; }
        public string TradCDescription { get; set; }
        public string TradDescription { get; set; }
    }

    public class ValidationInsertModal
    {
        public int EmpValidationId { get; set; }
        public int EmpDetailsId { get; set; }
        public int TradeId { get; set; }
        public int VAgencyId { get; set; }
        public int VDoneFlag { get; set; }
        public int VIsContinew { get; set; }
        public int VResult { get; set; }
        public int VAssTekenBy { get; set; }
        public string TestType { get; set; }
        public int TestTakenByEmpId { get; set; }
        public decimal TestTotalMarks { get; set; }
        public decimal TestObtainMarks { get; set; }
        public int TResult { get; set; }
    }

    public class AssessmentReportDetailsModel : Error
    {
        public int SrNo { get; set; }
        public string PRN { get; set; }
        public string Adhar { get; set; }
        public string Name { get; set; }
        public string PhotoURL { get; set; }
        public string TradeCategory { get; set; }
        public string TradeName { get; set; }
        public string ProjectTypeName { get; set; }      
        public int EmpDetailsId { get; set; }       
        public int EmpValidationId { get; set; }

        public string ApplicationID { get; set; }
        public string AssessmentID { get; set; }
        public string JobTitle { get; set; }
        public string MobileNo { get; set; }

        public string EmergencyContactNo { get; set; }
        public string Contractor { get; set; }
        public string PermanentAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string DOB { get; set; }
        public string TestLocation { get; set; }
        public string Pincode { get; set; }
        public decimal VOTotalMarks { get; set; }
        public decimal VOObtainMarks { get; set; }
        public decimal VPTotalMarks { get; set; }
        public decimal VPObtainMarks { get; set; }
        public decimal VWTotalMarks { get; set; }
        public decimal VWObtainMarks { get; set; }

        public string RemartkOne { get; set; }
        public string RemartkTwo { get; set; }
    }

    public class TrainingProcessDetailsModel
    {
            public int EmpDetailsId { get; set; }
        public string ExmSInductionName { get; set; }
        public string ExmSInductionDate { get; set; }
        public string ExmSInductionMarks { get; set; }
        public string ExmSInductionPassFail { get; set; }
        public int ExmSInductionIsDone { get; set; }
        public string ExmCSpaceName { get; set; }
        public string ExmCSpaceDate { get; set; }
        public string ExmCSpaceMarks { get; set; }
        public string ExmCSpacePassFail { get; set; }
        public int ExmCSpaceIsDone { get; set; }
        public string ExmWAtHightName { get; set; }
        public string ExmWAtHightDate { get; set; }
        public string ExmWAtHightMarks { get; set; }
        public string ExmWAtHightPassFail { get; set; }
        public int ExmWAtHightIsDone { get; set; }
        public int BTrainingId { get; set; }
        public int BTTekenBy { get; set; }
    }
}