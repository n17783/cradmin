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
    public class DepartmentController : Controller
    {
        // GET: Department
        DeptCR objdept = new DeptCR();
        public ActionResult Index()
        {
            return View();
        }
        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(DeptNames model)
        {
            return Json(objdept.save(model));
        }
        [MyAuthorize]
        [HttpPost]
        public ActionResult GetDeptList(DeptNames model)
        {
            return Json(objdept.GetDepartment(model));
        }
    }
}