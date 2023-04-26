using Bank.Model;

namespace Bank.Interfaces
{
    public interface IHistory
    {
        public ICollection<History> GetTokensHistory();

        public void AddToTokenHistory(Token token);

        public bool DeleteFromTokenHistory(History token);

        public History GetTokenById();

    }
}
