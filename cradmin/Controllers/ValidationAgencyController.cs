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
    public class ValidationAgencyController : Controller
    {
        ValidationAgencyCR objRole = new ValidationAgencyCR();
        // GET: Contractor
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(ValidationAgencyModel model)
        {
            return Json(objRole.Save(model));
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetValidationAgencyList(ValidationAgencyModel model)
        {
            return Json(objRole.GetValidationAgencyList(model));
        }
    }
}