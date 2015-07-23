namespace WebBaseSystem.Web.Controllers
{
    using System.Web.Mvc;
    using WebBaseSystem.Data;

    public class BaseMvcController : Controller
    {
        protected readonly IWebBaseData Data;

        public BaseMvcController()
            : this(new WebBaseData(new WebBaseDbContext()))
        {
        }

        public BaseMvcController(IWebBaseData data)
        {
            this.Data = data;
        }
    }
}