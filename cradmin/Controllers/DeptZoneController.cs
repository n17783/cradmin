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
    public class DeptZoneController : Controller
    {
        DeptZoneCR objDeptZone = new DeptZoneCR();
        // GET: ProjectType
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(DeptZone model)
        {
            return Json(objDeptZone.Save(model));
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetDeptZone(DeptZone model)
        {
             return Json(objDeptZone.GetDeptZone(model));
        }
    }
}