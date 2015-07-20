namespace WebBaseSystem.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PicUrl : DbMigration
    {
        public override void Up()
        {
            this.AddColumn("dbo.Pictures", "Url", c => c.String());
            this.DropColumn("dbo.Pictures", "Name");
        }
        
        public override void Down()
        {
            this.AddColumn("dbo.Pictures", "Name", c => c.String());
            this.DropColumn("dbo.Pictures", "Url");
        }
    }
}
