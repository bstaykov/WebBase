namespace WebBaseSystem.Web.Controllers
{
    using System;
    using System.Drawing;
    using System.Web;
    using System.Web.Mvc;
    using WebBaseSystem.Data;
    using WebBaseSystem.Models;
    using WebBaseSystem.Web.ViewModels;

    public class PictureController : BaseMvcController
    {
        [HttpGet]
        public ActionResult Add()
        {
            return this.View(new PictureInputModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Add(PictureInputModel model)
        {
            if (ModelState.IsValid)
            {
                string urlToSaveInDb = this.SavePic(model.Picture);
                if (urlToSaveInDb != null)
                {
                    var picture = new Picture() 
                    {
                        Title = model.Title,
                        Url = urlToSaveInDb,
                    };
                    this.Data.Pictures.Add(picture);
                    this.Data.SaveChanges();

                    return this.RedirectToAction("Add", "Home");
                }
                else
                {
                    this.ModelState.AddModelError(string.Empty, "Error while saving picture!");
                }
            }

            return this.View(model);
        }

        private string SavePic(HttpPostedFileBase profilePic)
        {
            if (profilePic != null)
            {
                string fileContentType = profilePic.ContentType.Substring(profilePic.ContentType.IndexOf('/') + 1);
                if (this.IsValidExtension(fileContentType) && profilePic.ContentLength <= 2048000)
                {
                    Image image = Image.FromStream(profilePic.InputStream);

                    // Image resizedImage = this.ResizeImage(image, new Size(350, 350));
                    string fileName = Guid.NewGuid().ToString();
                    string picName = string.Format("{0}.{1}", fileName, fileContentType);
                    string picUrl = Server.MapPath("~/App_Data/Images/") + picName;
                    image.Save(picUrl);
                    string url = "/App_Data/Images/" + picName;
                    return url;
                }
            }

            return null;
        }

        private Image ResizeImage(Image imgToResize, Size size)
        {
            return (Image)(new Bitmap(imgToResize, size));
        }

        private bool IsValidExtension(string fileExtension)
        {
            var validFileExtensions = new string[] { "jpg", "jpeg", "bmp", "gif", "png" };
            if (fileExtension.Length > 0)
            {
                for (var j = 0; j < validFileExtensions.Length; j++)
                {
                    var currentExtension = validFileExtensions[j];
                    if (fileExtension.ToLower() == currentExtension.ToLower())
                    {
                        return true;
                    }
                }
            }

            return false;
        }
    }
}