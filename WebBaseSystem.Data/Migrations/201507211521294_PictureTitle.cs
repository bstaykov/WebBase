namespace WebBaseSystem.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PictureTitle : DbMigration
    {
        public override void Up()
        {
            this.AddColumn("dbo.Pictures", "Title", c => c.String());
        }
        
        public override void Down()
        {
            this.DropColumn("dbo.Pictures", "Title");
        }
    }
}
