namespace WebBaseSystem.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Http.Cors;
    using System.Web.OData;

    public class ValuesController : ApiController
    {
        [HttpGet]
        public long Sum(int firstNumber, int secondNumber)
        {
            return firstNumber + secondNumber;
        }

        [EnableQuery]
        [EnableCors(origins: "*", headers: "*", methods: "get;post")]
        [HttpGet]
        public IQueryable<string> LatestPostNames()
        {
            var data = new string[] { "A1", "B2", "C3", "D4", "E5" };
            return data.AsQueryable();
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
