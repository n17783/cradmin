using cradmin.Models.BAL;
using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cradmin.Controllers
{
    public class ContractorController : Controller
    {
        MainContractorCR objContractor = new MainContractorCR();
        // GET: Contractor
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Save(MainContractor model)
        {
            return Json(objContractor.Save(model));
        }

        [HttpPost]
        public ActionResult GetContractorList(MainContractor model)
        {
            return Json(objContractor.GetContractorList(model));
        }
    }
}