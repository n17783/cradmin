using cradmin.Models;
using cradmin.Models.BAL;
using cradmin.Models.Models;
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
           
            if (SessionManager.Instance.LoginUser==null)
            {
                Response.Cookies.Clear();
                ViewBag.Token = "";
                return RedirectToAction("Index", "Home");
            }
            else
            {
                HttpCookie StudentCookies = new HttpCookie("Token");
                StudentCookies.Value = SessionManager.Instance.LoginUser.Token.ToString();
                StudentCookies.Expires = DateTime.Now.AddHours(1);
                Response.SetCookie(StudentCookies);
                ViewBag.Token = SessionManager.Instance.LoginUser.Token.ToString();
                return View();
            }
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult CheckAdhaarExist(Employee model)
        {
            MasterDataResponse response = objEmp.CheckUserExist(model);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        [MyAuthorize]
        [HttpPost]
        public ActionResult GetEmpFilterTradeList(TradeType model)

        {
            List<TradeType> response = objEmp.EmpFilterTradeList(model);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        [MyAuthorize]
        [HttpPost]
        public ActionResult MultiTrade(TradeMapping model)
        {
            return Json(objEmp.MultiTrade(model), JsonRequestBehavior.AllowGet);
        }
        [MyAuthorize]
        [HttpPost]
        public ActionResult Get_UserRoles()
        {
            MasterDataResponse response = new MasterDataResponse();
            response.RoleList = objEmp.Get_UserRoles();
            response.Status = 1;
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Get_StaffDetails(Staff model)
        {
            MasterDataResponse response = new MasterDataResponse();
            response.StaffList = objEmp.Get_StaffDetails(model);
            response.Status = 1;
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Assign_Role(Staff model)
        {
            MasterDataResponse response = new MasterDataResponse();
            objEmp.Assign_Role(model);
            response.Status = 1;
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult GetMasterDataforRegister()
        {
            return Json(objEmp.GetMasterData(), JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Save(MasterDataResponse model)
        {
            return Json(objEmp.RegisterEmployee(model), JsonRequestBehavior.AllowGet);
        }

        [MyAuthorize]
        [HttpPost]
        public ActionResult Capture()
        {
            string imagepath = "";
            if (Request.InputStream.Length > 0)
            {
                using (StreamReader reader = new StreamReader(Request.InputStream))
                {
                    string hexString = Server.UrlEncode(reader.ReadToEnd());
                    string imageName = DateTime.Now.ToString("dd-MM-yy-hh-mm-ss");
                    string imagePath = string.Format("~/Content/CaptureEmployee/{0}.png", imageName);
                    System.IO.File.WriteAllBytes(Server.MapPath(imagePath), ConvertHexToBytes(hexString));
                    imagepath = VirtualPathUtility.ToAbsolute(imagePath);
                }
            }
            return Json(imagepath, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UploadAdhaar()
        {
            string base64string = string.Empty;
            if (Request.Files.Count > 0)
            {
                HttpPostedFileBase file = Request.Files[0];
                string imageName = DateTime.Now.ToString("dd-MM-yy-hh-mm-ss");
                base64string = "Content/UploadAdhaar/" + imageName + ".jpg";
                file.SaveAs(Server.MapPath("~/" + base64string));
                base64string = VirtualPathUtility.ToAbsolute("~/" + base64string);
            }
            return Json(base64string);
        }

        [HttpPost]
        public ActionResult UploadA()
        {
            string base64string = string.Empty; 
            if (Request.Files.Count > 0)
            {
                HttpPostedFileBase file = Request.Files[0];
                string imageName = DateTime.Now.ToString("dd-MM-yy-hh-mm-ss");
                base64string = "Content/CaptureEmployee/" + imageName + ".jpg";
                file.SaveAs(Server.MapPath("~/" + base64string));
                base64string = VirtualPathUtility.ToAbsolute("~/" + base64string);
            }
            return Json(base64string);
        }

        [HttpPost]
        public ActionResult UploadValidationCertificate()
        {
            string base64string = string.Empty;
            if (Request.Files.Count > 0)
            {
                HttpPostedFileBase file = Request.Files[0];
                string imageName = DateTime.Now.ToString("dd-MM-yy-hh-mm-ss");
                base64string = "Content/UploadValidationCertificate/" + imageName + ".jpg";
                file.SaveAs(Server.MapPath("~/" + base64string));
                base64string = VirtualPathUtility.ToAbsolute("~/" + base64string);
            }
            return Json(base64string);
        }

        [HttpPost]
        public ActionResult UploadIdProofDoc()
        {
            string base64string = string.Empty;
            if (Request.Files.Count > 0)
            {
                HttpPostedFileBase file = Request.Files[0];
                string imageName = DateTime.Now.ToString("dd-MM-yy-hh-mm-ss");
                base64string = "Content/UploadIdProofDoc/" + imageName + ".jpg";
                file.SaveAs(Server.MapPath("~/" + base64string));
                base64string = VirtualPathUtility.ToAbsolute("~/" + base64string);
            }
            return Json(base64string);
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