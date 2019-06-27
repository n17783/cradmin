using cradmin.Models.BAL;
using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cradmin.Controllers
{
    public class PlantController : Controller
    {
        // GET: Plant
        PlantCreationCR objplant = new PlantCreationCR();
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult save(PlantModel model)
        {
            return Json(objplant.save(model));
        }

        [HttpPost]
        public ActionResult GetPlantList(PlantModel model)
        {
            return Json(objplant.GetPlantList(model));
        }

    }
}