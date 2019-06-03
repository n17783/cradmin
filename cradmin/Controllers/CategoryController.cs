using cradmin.Models.BAL;
using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cradmin.Controllers
{
    public class CategoryController : Controller
    {
        TradeCategoryCR objTrade = new TradeCategoryCR();
        // GET: Category
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Save(TradeCategory model)
        {
            return Json(objTrade.Save(model));
        }

        [HttpPost]
        public ActionResult GetTrade(TradeCategory model)
        {
            return Json(objTrade.GetTradeList(model));
        }
    }
}