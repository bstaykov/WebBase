using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Http;
using Microsoft.Owin;
using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;
using WebBaseSystem.Data;

[assembly: OwinStartup(typeof(WebBaseSystem.Web.Startup))]

namespace WebBaseSystem.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            this.ConfigureAuth(app);
            app.UseNinjectMiddleware(CreateKernel).UseNinjectWebApi(GlobalConfiguration.Configuration);
        }

        private static StandardKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            kernel.Load(Assembly.GetExecutingAssembly());

            BindTypes(kernel);

            return kernel;
        }

        private static void BindTypes(StandardKernel kernel)
        {
            kernel.Bind<IWebBaseData>().To<WebBaseData>().WithConstructorArgument("context", c => new WebBaseDbContext());
        }
    }
}
