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
    public class ValidationTestQuetionController : Controller
    {
        ValidationQuetionCR objValQ = new ValidationQuetionCR();

        // GET: quetionlist
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetMasterDataforQuetions()
        {
            try
            {
                return Json(objValQ.GetMasterData(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
           
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetQuetion(TestQueCategory model)
        {
            return Json(objValQ.GetQuetionList(model), JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(TestQueCategory model)
        {
            return Json(objValQ.Save(model));
        }

    }
}