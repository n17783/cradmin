using cradmin.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cradmin.Models
{
    public class SessionManager
    {
        static SessionManager _Instance = null;
        private SessionManager()
        {

        }

        public static SessionManager Instance
        {
            get
            {
                if (_Instance == null)
                {
                    _Instance = new SessionManager();
                }
                return _Instance;
            }
        }

        public LoginResponse LoginUser
        {
            get
            {
                LoginResponse emp = null;
                if (HttpContext.Current.Session["AuthUser"]!=null)
                {
                    emp = (LoginResponse)HttpContext.Current.Session["AuthUser"];
                }
                return emp;
            }
            set
            {
                HttpContext.Current.Session["AuthUser"] = value;
            }
        }


        public string ImageUrl
        {
            get
            {
                string emp = null;
                if (HttpContext.Current.Session["ImageUrl"] != null)
                {
                    emp = Convert.ToString(HttpContext.Current.Session["ImageUrl"]);
                }
                return emp;
            }
            set
            {
                HttpContext.Current.Session["ImageUrl"] = value;
            }
        }

    }
}