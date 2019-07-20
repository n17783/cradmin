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
    public class RollFormMappingController : Controller
    {
        FormAssignToRollCR objFormToRoll = new FormAssignToRollCR();

        // GET: PlantTradeTracking
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetMasterDataforAssign()
        {
            return Json(objFormToRoll.GetMasterData(), JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetFormToRoll(RollFormMappResponce model)
        {
            return Json( objFormToRoll.GetFormToRoll(model).ToList<RollFormMappResponce>(), JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(RollFormMappResponce model)
        {
            return Json(objFormToRoll.Save(model));
        }
    }
}