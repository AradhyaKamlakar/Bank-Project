using Bank.Data;
using Bank.Interfaces;
using Bank.Model;

namespace Bank.Repository
{
    public class ServiceRepository: IService
    {
        private readonly DataContext _context;
        public ServiceRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Service> Getservices()
        {
            return _context.Services.OrderBy(x => x.Id).ToList();
        }

        public bool CreateService(Service service)
        {
            Service service1 = new Service() 
            {
                Id = service.Id,
                ServiceName= service.ServiceName,
                ServiceTime= service.ServiceTime,
            };
            _context.Services.Add(service1);
            _context.SaveChanges();
            return true;
        }

        public bool UpdateService(Service service) 
        {
            
            _context.Services.Update(service);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteService(Service service) 
        {
            _context.Services.Remove(service);
            _context.SaveChanges();
            return true;
        }

         
    }
}
