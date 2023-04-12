using Bank.Model;

namespace Bank.Interfaces
{
    public interface IHistory
    {
        ICollection<History> GetTokensHistory();

        public void AddToTokenHistory(History token);

        public bool DeleteFromTokenHistory(History token);
    }
}
