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
    public class RoleController : Controller
    {
        RoleCR objRole = new RoleCR();
        // GET: Contractor
        public ActionResult Index()
        {
            return View();
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(RoleModel model)
        {
            return Json(objRole.Save(model));
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetRoleList(RoleModel model)
        {
            return Json(objRole.GetRoleList(model));
        }
    }
}