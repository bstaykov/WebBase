namespace WebBaseSystem.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Drawing;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Http;
    using WebBaseSystem.Data;
    using WebBaseSystem.Models;

    [Authorize]
    public class ImagesController : BaseApiController
    {
        // public ImagesController(IWebBaseData data)
        // : base(data)
        // {
        // }
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var pictures = this.Data.Pictures.All().ToArray();
            return this.Ok(pictures);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> Add()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/Files/Images/");
            var provider = new MultipartFormDataStreamProvider(root);

            try
            {
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);

                bool isSaved = false;
                var newName = string.Empty;
                Picture picture = new Picture();

                foreach (MultipartFileData file in provider.FileData)
                {
                    var fileName = file.Headers.ContentDisposition.FileName;
                    var extensionStartIndex = fileName.LastIndexOf('.') + 1;
                    var extensionEndIndex = fileName.LastIndexOf('"');
                    var extension = fileName.Substring(extensionStartIndex, extensionEndIndex - extensionStartIndex);
                    if(this.IsValidExtension(extension)){
                        newName = file.LocalFileName + '.' + extension;
                        File.Move(file.LocalFileName, newName);
                        string url = newName.Substring(newName.LastIndexOf("\\") + 1);
                        picture.Url = url;
                        isSaved = true;
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.BadRequest);
                    }
                }

                bool isTitleCorrect = false;
                foreach (var key in provider.FormData.AllKeys)
                {
                    foreach (var val in provider.FormData.GetValues(key))
                    {
                        if (string.IsNullOrEmpty(val) == false) {
                            picture.Title = val;
                            isTitleCorrect = true;
                        }
                        else if (isSaved)
                        {
                            File.Delete(newName);
                            return Request.CreateResponse(HttpStatusCode.BadRequest);
                        }
                    }
                }

                if (isSaved && isTitleCorrect)
                {
                    this.Data.Pictures.Add(picture);
                    this.Data.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK);
                }

                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var picture = this.Data.Pictures.GetById(id);
            if (picture != null)
            {
                this.Data.Pictures.Delete(picture);
                this.Data.SaveChanges();
                string root = HttpContext.Current.Server.MapPath("~/Files/Images/");
                File.Delete(root + picture.Url);
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
                    string root = HttpContext.Current.Server.MapPath("~/Files/Images/");
                    File.Delete(root + picture.Url);
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
                    string picUrl = HttpContext.Current.Server.MapPath("~/Files/Images/") + picName;
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

        [HttpPost]
        public async Task<HttpResponseMessage> PostFormData()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/Files/Images/");
            var provider = new MultipartFormDataStreamProvider(root);

            try
            {
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);

                // This illustrates how to get the file names.
                foreach (MultipartFileData file in provider.FileData)
                {
                    Trace.WriteLine(file.Headers.ContentDisposition.FileName);
                    Trace.WriteLine("Server file path: " + file.LocalFileName);
                }

                Trace.WriteLine(provider.FormData.Get("title"));
                Trace.WriteLine(provider.FormData.Get("info"));

                // Show all the key-value pairs.
                foreach (var key in provider.FormData.AllKeys)
                {
                    foreach (var val in provider.FormData.GetValues(key))
                    {
                        Trace.WriteLine(string.Format("{0}: {1}", key, val));
                    }
                }

                var response = Request.CreateResponse(HttpStatusCode.Redirect);
                response.Headers.Location = new Uri("http://localhost:50930/#/getAllImages");

                return response;
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
