using cradmin.Models;
using cradmin.Models.BAL;
using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cradmin.Controllers
{
    public class CandidatesForValidationController : Controller
    {
        CandidatesForValidationCR obj = new CandidatesForValidationCR();
        // GET: CandidatesForValidation
        public ActionResult Index()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult GetCandidatesForValidationList(CandidatesForValidationModel model)
        {
            return Json(obj.GetCandidatesForValidationList(model));
        }

        [HttpPost]
        public ActionResult GetQuestionsList(CandidatesForValidationModel model)
        {
            return Json(obj.GetQuestionsList(model));
        }

        [HttpPost]
        public ActionResult SaveValidatonProcess(ValidationInsertModal model)
        {
            return Json(obj.SaveValidatonProcess(model));
        }

        [HttpPost]
        public ActionResult GetAssessedReportDetails(ValidationInsertModal model)
        {
            return Json(obj.GetAssessedReportDetails(model));
        }

        [HttpPost]
        public ActionResult SaveAssessmentResultStatusDetails(AssessmentReportDetailsModel model)
        {
            return Json(obj.SaveAssessmentResultStatusDetails(model));
        }

        public ActionResult GetTrainingProcessDetails(CandidatesForValidationModel model)
        {
            return Json(obj.GetTrainingProcessDetails(model));
        }

        public ActionResult SaveTrainingProcessDetails(TrainingProcessDetailsModel model)
        {
            return Json(obj.SaveTrainingProcessDetails(model));
        }
    }
}