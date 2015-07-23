using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Http;
using Microsoft.Owin;
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
        }
    }
}
