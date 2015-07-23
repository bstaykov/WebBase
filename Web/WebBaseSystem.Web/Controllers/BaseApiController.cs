namespace WebBaseSystem.Web.Controllers
{
    using System.Web.Http;
    using WebBaseSystem.Data;

    public class BaseApiController : ApiController
    {
        protected readonly IWebBaseData Data;

        public BaseApiController()
            : this(new WebBaseData(new WebBaseDbContext()))
        {
        }

        public BaseApiController(IWebBaseData data)
        {
            this.Data = data;
        } 
    }
}
