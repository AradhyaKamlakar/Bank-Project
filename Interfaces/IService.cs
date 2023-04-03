using Bank.Model;

namespace Bank.Interfaces
{
    public interface IService
    {
        ICollection<Service> Getservices();
        public bool CreateService(Service service);
    }
}
