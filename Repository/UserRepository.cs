using Bank.Data;
using Bank.Interfaces;
using Bank.Model;

namespace Bank.Repository
{
    public class UserRepository: IUser
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context) 
        {
            _context = context;
        }

        public ICollection<User> GetUsers() 
        {
            return _context.Users.OrderBy(x => x.Id).ToList();
        }
    }
}
