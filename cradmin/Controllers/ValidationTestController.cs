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
    public class ValidationTestController : Controller
    {
        
        ValidationTestCr objTest = new ValidationTestCr();
        // GET: Category
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(TestCategory model)
        {
            return Json(objTest.Save(model));
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetTest(TestCategory model)
        {
            return Json(objTest.GetTestList(model));
        }
    }
}