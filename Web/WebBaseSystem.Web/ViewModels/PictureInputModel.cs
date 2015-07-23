namespace WebBaseSystem.Web.ViewModels
{
    using System.Web;

    public class PictureInputModel
    {
        public string Title { get; set; }

        public HttpPostedFileBase Picture { get; set; }
    }
}