namespace WebBaseSystem.Data
{
    using WebBase.Common.Repository;
    using WebBaseSystem.Models;

    public interface IWebBaseData
    {
        IRepository<Picture> Pictures { get; }

        int SaveChanges();
    }
}
