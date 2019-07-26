using cradmin.Models.BAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cradmin.Models
{
    public class MyAuthorizeAttribute : ActionFilterAttribute
    {

        public bool IsAdmin { get; set; }

        public bool IsAgent { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var token=filterContext.HttpContext.Request.Headers["Token"];
            HttpCookie cookie = filterContext.HttpContext.Request.Cookies["Token"];
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                if (token != null)
                {
                    string authtoken= Convert.ToString(filterContext.HttpContext.Request.Headers["Token"]);
                    if (ValidateAuthToken(authtoken)) {
                        HttpCookie StudentCookies = new HttpCookie("Token");
                        StudentCookies.Value = authtoken;
                        StudentCookies.Expires = DateTime.Now.AddHours(1);
                        filterContext.HttpContext.Response.SetCookie(StudentCookies);
                        return;
                    }
                    else
                    {
                        Error error = new Error();
                        error.Status = 2;
                        filterContext.Result = new JsonResult
                        {
                            Data = error,
                            JsonRequestBehavior = JsonRequestBehavior.AllowGet
                        };
                    }
                }
                else
                {
                    Error error = new Error();
                    error.Status = 2;
                    filterContext.Result = new JsonResult
                    {
                        Data = error,
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                }
            }
            else
            {
                if (cookie==null)
                {
                    filterContext.HttpContext.Response.Cookies.Clear();
                    var redirectTarget = new System.Web.Routing.RouteValueDictionary(new { action = "Index", controller = "Home", area = "" });
                    filterContext.Result = new RedirectToRouteResult(redirectTarget);
                }
                else
                {
                    string authtoken = cookie.Value;
                    if (string.IsNullOrEmpty(authtoken))
                    {
                        filterContext.HttpContext.Response.Cookies.Clear();
                        var redirectTarget = new System.Web.Routing.RouteValueDictionary(new { action = "Index", controller = "Home", area = "" });
                        filterContext.Result = new RedirectToRouteResult(redirectTarget);
                    }
                    else if (ValidateAuthToken(authtoken))
                    {
                        HttpCookie StudentCookies = new HttpCookie("Token");
                        StudentCookies.Value = authtoken;
                        StudentCookies.Expires = DateTime.Now.AddHours(1);
                        filterContext.HttpContext.Response.SetCookie(StudentCookies);
                        return;
                    }
                    else
                    {
                        filterContext.HttpContext.Response.Cookies.Clear();
                        //var redirectTarget = new System.Web.Routing.RouteValueDictionary(new { action = "Index", controller = "Home", area = "" });
                        Error error = new Error();
                        error.Status = 2;
                        filterContext.Result = new JsonResult
                        {
                            Data = error,
                            JsonRequestBehavior = JsonRequestBehavior.AllowGet
                        };
                    }
                }
            }
            
        }

        public bool ValidateAuthToken(string authtoken)
        {
            bool valid = false;
            AccountBusiness objAuth = new AccountBusiness();
            valid=objAuth.ValidateToken(authtoken);
            return valid;
        }
    }
}