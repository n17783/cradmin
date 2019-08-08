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
    public class SubContractorController : Controller
    {
        SubContractorCR objSubContractor = new SubContractorCR();
        // GET: SubContractor
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetMainContractor()
        {
            return Json(objSubContractor.GetMasterData(), JsonRequestBehavior.AllowGet);
        }
        [MyAuthorize]
        [HttpPost]
        public ActionResult GetSubContractor(SubContractor model)
        {
            return Json(objSubContractor.GetSubContractorList(model), JsonRequestBehavior.AllowGet);
        }
        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(SubContractor model)
        {
            
            return Json(objSubContractor.Save(model));
        }
    }
}