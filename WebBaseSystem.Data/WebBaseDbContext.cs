namespace WebBaseSystem.Data
{
    using System.Data.Entity;

    using Microsoft.AspNet.Identity.EntityFramework;

    using WebBaseSystem.Data.Migrations;
    using WebBaseSystem.Models;

    public class WebBaseDbContext : IdentityDbContext<User>
    {
        public WebBaseDbContext()
            : base("WebBaseConnection", throwIfV1Schema: false)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<WebBaseDbContext, Configuration>());
        }

        public virtual IDbSet<Picture> Pictures { get; set; }

        public static WebBaseDbContext Create()
        {
            return new WebBaseDbContext();
        }

        public override int SaveChanges()
        {
            return base.SaveChanges();
        }
    }
}
