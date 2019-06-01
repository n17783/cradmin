using System.Web;
using System.Web.Optimization;

namespace cradmin
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            


            bundles.Add(new StyleBundle("~/Content/AdminLayout/css").Include(
                      "~/Content/AdminLayout/bootstrap.min.css",
                      "~/Content/AdminLayout/font-awesome.min.css",
                      "~/Content/AdminLayout/ionicons.min.css",
                      "~/Content/AdminLayout/AdminLTE.min.css"
                        , "~/Content/AdminLayout/_all-skins.min.css"
                        , "~/Content/AdminLayout/morris.css"
                        , "~/Content/AdminLayout/jquery-jvectormap.css"
                        , "~/Content/AdminLayout/bootstrap-datepicker.min.css"
                        , "~/Content/AdminLayout/daterangepicker.css"
                        , "~/Content/AdminLayout/bootstrap3-wysihtml5.min.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/AdminLayout/jquery").Include(
                    "~/Scripts/AdminLayout/jquery.min.js",
                    "~/Scripts/AdminLayout/jquery-ui.min.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/AdminLayout/Alljquery").Include(
                    "~/Scripts/AdminLayout/bootstrap.min.js",
                    "~/Scripts/AdminLayout/raphael.min.js",
                    "~/Scripts/AdminLayout/morris.min.js",
                    "~/Scripts/AdminLayout/jquery.sparkline.min.js",
                    "~/Scripts/AdminLayout/jquery-jvectormap-1.2.2.min.js",
                    "~/Scripts/AdminLayout/jquery-jvectormap-world-mill-en.js",
                    "~/Scripts/AdminLayout/moment.min.js",
                    "~/Scripts/AdminLayout/daterangepicker.js",
                    "~/Scripts/AdminLayout/bootstrap-datepicker.min.js",
                    "~/Scripts/AdminLayout/bootstrap3-wysihtml5.all.min.js",
                    "~/Scripts/AdminLayout/jquery.slimscroll.min.js",
                    "~/Scripts/AdminLayout/fastclick.js",
                    "~/Scripts/AdminLayout/adminlte.min.js",
                    "~/Scripts/AdminLayout/jquery.knob.min.js",
                    "~/Scripts/AdminLayout/jquery.min.js",
                    "~/Scripts/AdminLayout/jquery-ui.min.js"
                ));
        }
    }
}
