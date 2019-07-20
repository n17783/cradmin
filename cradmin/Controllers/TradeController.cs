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
    public class TradeController : Controller
    {
        TradeTypeCR objTradeType = new TradeTypeCR();
        // GET: ProjectType
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(TradeType model)
        {
            return Json(objTradeType.Save(model));
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetTradeType(TradeType model)
        {
            return Json(objTradeType.GetTradeTypeList(model));
        }
    }
}