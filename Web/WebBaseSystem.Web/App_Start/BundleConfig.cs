namespace WebBaseSystem.Web
{
    using System.Web;
    using System.Web.Optimization;

    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/custom").Include(
                        "~/Scripts/custom/imagesValidations.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularLibs").Include(
                        "~/Scripts/Angular/libs/angular.js",
                        "~/Scripts/Angular/libs/angular-sanitize.js",
                        "~/Scripts/Angular/libs/angular-cookies.js",
                        "~/Scripts/Angular/libs/angular-route.js",
                        "~/Scripts/Angular/libs/angular-resource.js",
                        "~/Scripts/Angular/app/app.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularMinLibs").Include(
                        "~/Scripts/Angular/libs/angular.min.js",
                        "~/Scripts/Angular/libs/angular-sanitize.min.js",
                        "~/Scripts/Angular/libs/angular-cookies.min.js",
                        "~/Scripts/Angular/libs/angular-route.min.js",
                        "~/Scripts/Angular/libs/angular-resource.min.js",
                        "~/Scripts/Angular/app/app.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularContent")
                .Include("~/Scripts/Angular/app/app.js")
                .IncludeDirectory("~/Scripts/Angular/app/controllers", "*.js", true)
                .IncludeDirectory("~/Scripts/Angular/app/services", "*.js", true)
                .IncludeDirectory("~/Scripts/Angular/app/directives", "*.js", true)
                .IncludeDirectory("~/Scripts/Angular/app/filters", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            // BundleTable.EnableOptimizations = false;
        }
    }
}
