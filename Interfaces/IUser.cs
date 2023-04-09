using Bank.Model;

namespace Bank.Interfaces
{
    public interface IUser
    {
        ICollection<User> GetUsers();
        public bool CreateUser(User user);
        public User GetUserByUserId(int userid);
        public User GetUserById(int id);
    }
}
