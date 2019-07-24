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
    public class CourseMasterController : Controller
       
    {
        CourseCreationCR objCCreation = new CourseCreationCR();
        // GET: CourseMaster
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(CourseMasterResponse model)
        {
            return Json(objCCreation.Save(model));
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetCourseMasterDetails(CourseMasterResponse model)
        {
            return Json(objCCreation.GetCourseMasterList(model));
        }
    }
}