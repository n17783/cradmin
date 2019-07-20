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
    public class EmployeeTypeController : Controller
    {
        EmployeeTypeCR objEmployeeType = new EmployeeTypeCR();
        // GET: ProjectType
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(EmployeeType model)
        {
            return Json(objEmployeeType.Save(model));
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetEmpType(EmployeeType model)
        {
            return Json(objEmployeeType.GetEmployeeTypeList(model));
        }
    }
}