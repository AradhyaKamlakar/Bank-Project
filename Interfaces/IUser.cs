using Bank.Model;

namespace Bank.Interfaces
{
    public interface IUser
    {
        ICollection<User> GetUsers();
    }
}
