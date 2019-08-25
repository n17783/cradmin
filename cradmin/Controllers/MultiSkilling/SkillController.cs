using cradmin.Models;
using cradmin.Models.BAL;
using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cradmin.Controllers.MultiSkilling
{
    public class SkillController : Controller
    {

        SkillMatricsCR objSkillType = new SkillMatricsCR();
        // GET: Skill Type
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(SkillType model)
        {
            return Json(objSkillType.Save(model));
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetSkillType(SkillType model)
        {
            return Json(objSkillType.GetSkillTypeList(model));
        }
    }
}