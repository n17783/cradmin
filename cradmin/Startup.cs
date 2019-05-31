using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(cradmin.Startup))]
namespace cradmin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
