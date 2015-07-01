namespace WebBaseSystem.Web
{
    using System.Net.Http.Headers;
    using System.Web.Http;
    using System.Web.OData.Extensions;
    using Microsoft.Owin.Security.OAuth;

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            // enable EnableQuery (global)
            config.AddODataQueryFilter();

            // enable external consuming
            config.EnableCors();

            config.Routes.MapHttpRoute(
                name: "DefaultApiWithAction",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional });

            // config.Routes.MapHttpRoute(
            // name: "DefaultApi",
            // routeTemplate: "api/{controller}/{id}",
            // defaults: new { id = RouteParameter.Optional });

            // return JSON
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
        }
    }
}
