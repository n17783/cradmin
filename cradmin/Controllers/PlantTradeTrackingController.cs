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
    public class PlantTradeTrackingController : Controller
    {
        PlantTradeTrackingCR objTradeTracking = new PlantTradeTrackingCR();
        
        // GET: PlantTradeTracking
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetMasterDataforRegister()
        {
            return Json(objTradeTracking.GetMasterData(), JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetTradeStrenth(PlantTradeTracking model)
        {
            
            return Json(objTradeTracking.GetPlantTradeStrenth(model), JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(PlantTradeTracking model)
        {
            return Json(objTradeTracking.Save(model));
        }

    }
}