using cradmin.Models.BAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cradmin.Controllers
{
    public class DashboardController : Controller
    {
        EmpployeeRegisterBAL objEmp = new EmpployeeRegisterBAL();
        // GET: Dashboard
        public ActionResult Index()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult GetMasterDataforRegister()
        {
            return Json(objEmp.GetMasterData(), JsonRequestBehavior.AllowGet);
        }
    }
}