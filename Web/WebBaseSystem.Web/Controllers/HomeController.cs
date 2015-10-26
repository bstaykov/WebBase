namespace WebBaseSystem.Web.Controllers
{
    using System;
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return this.View();
        }

        public ActionResult Test1()
        {
            ViewBag.Title = "Test1 Page";
            var randomNumber = new Random().Next(0, 101);

            return this.PartialView("Test1", randomNumber);
        }

        public ActionResult Test2()
        {
            ViewBag.Title = "Test2 Page";
            var randomNumber = new Random().Next(0, 101);

            return this.PartialView("Test2", randomNumber);
        }
    }
}
