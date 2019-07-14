using cradmin.Models.BAL;
using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cradmin.Controllers
{
    public class ProjectTypeController : Controller
    {
        ProjectTypeCR objProjectType = new ProjectTypeCR();
        // GET: ProjectType
        public ActionResult Index()
        {
            return PartialView("Index");
        }

        [HttpPost]
        public ActionResult Save(ProjectType model)
        {
            return Json(objProjectType.Save(model));
        }

        [HttpPost]
        public ActionResult GetProjectType(ProjectType model)
        {
            return Json(objProjectType.GetProjectTypeList(model));
        }
    }
}