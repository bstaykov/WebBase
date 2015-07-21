namespace WebBaseSystem.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.IO;
    using System.Linq;
    using System.Web;
    using System.Web.Http;
    using WebBaseSystem.Data;
    using WebBaseSystem.Models;

    [Authorize]
    public class ImagesController : BaseController
    {
        public ImagesController(IWebBaseData data)
            : base(data)
        {
        }

        public IEnumerable<Picture> GetAll()
        {
            var pictures = this.Data.Pictures.All();

            return pictures;
        }

        [HttpPost]
        public IHttpActionResult Add()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                }

                return this.Ok();
            }

            return this.BadRequest();

            // if (ModelState.IsValid)
            // {
            // string url = this.SavePic(image);

            // if (url != null)
            // {
            // var pictureEntity = new Picture()
            // {
            // Url = url,
            // };

            // this.Data.Pictures.Add(pictureEntity);
            // this.Data.SaveChanges();

            // return this.Ok(url);
            // }
            // }

            // return this.BadRequest();
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var picture = this.Data.Pictures.GetById(id);
            if (picture != null)
            {
                this.Data.Pictures.Delete(picture);
                this.Data.SaveChanges();
                File.Delete(picture.Url);
                return this.Ok();
            }

            return this.BadRequest();
        }

        [HttpDelete]
        public IHttpActionResult DeleteAll()
        {
            var pictures = this.Data.Pictures.All();

            foreach (var picture in pictures)
            {
                if (picture != null)
                {
                    this.Data.Pictures.Delete(picture);
                    File.Delete(picture.Url);
                }
            }

            this.Data.SaveChanges();
            return this.Ok();
        }

        private string SavePic(HttpPostedFileBase newImage)
        {
            if (newImage != null)
            {
                string fileContentType = newImage.ContentType.Substring(newImage.ContentType.IndexOf('/') + 1);
                if (this.IsValidExtension(fileContentType) && newImage.ContentLength <= 2048000)
                {
                    Image image = Image.FromStream(newImage.InputStream);
                    string fileName = Guid.NewGuid().ToString();
                    string picName = string.Format("{0}.{1}", fileName, fileContentType);
                    string picUrl = HttpContext.Current.Server.MapPath("~/App_Data/Images/") + picName;
                    image.Save(picUrl);

                    return picUrl;
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
