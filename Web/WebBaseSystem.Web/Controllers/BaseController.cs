namespace WebBaseSystem.Web.Controllers
{
    using System.Web.Http;
    using WebBaseSystem.Data;

    public class BaseController : ApiController
    {
        protected readonly IWebBaseData Data;

        // public BaseController()
        // : this(new WebBaseData(new WebBaseDbContext()))
        // {
        // }
        public BaseController(IWebBaseData data)
        {
            this.Data = data;
        } 
    }
}
