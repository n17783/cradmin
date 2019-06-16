using cradmin.Models.BAL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cradmin.Controllers
{
    public class DashboardController : Controller
    {
        EmpployeeRegisterBAL objEmp = new EmpployeeRegisterBAL();
        // GET: Dashboard
        public ActionResult Index()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult GetMasterDataforRegister()
        {
            return Json(objEmp.GetMasterData(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Capture()
        {
            string imagepath = "";
            if (Request.InputStream.Length > 0)
            {
                using (StreamReader reader = new StreamReader(Request.InputStream))
                {
                    string hexString = Server.UrlEncode(reader.ReadToEnd());
                    string imageName = DateTime.Now.ToString("dd-MM-yy hh-mm-ss");
                    string imagePath = string.Format("~/Content/CaptureEmployee/{0}.png", imageName);
                    System.IO.File.WriteAllBytes(Server.MapPath(imagePath), ConvertHexToBytes(hexString));
                    imagepath = VirtualPathUtility.ToAbsolute(imagePath);
                }
            }
            return Json(imagepath,JsonRequestBehavior.AllowGet);
        }

        private static byte[] ConvertHexToBytes(string hex)
        {
            byte[] bytes = new byte[hex.Length / 2];
            for (int i = 0; i < hex.Length; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            }
            return bytes;
        }
    }
}