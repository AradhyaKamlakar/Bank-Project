using Bank.Data;
using Bank.Interfaces;
using Bank.Model;

namespace Bank.Repository
{
    public class HistoryRepository : IHistory
    {
        private readonly DataContext _context;

        public HistoryRepository(DataContext context)
        {
            _context = context;
        }
        public void AddToTokenHistory(History token)
        {
            _context.History.Add(token);
            _context.SaveChanges();
            return;
        }

        public bool DeleteFromTokenHistory(History token)
        {
            _context.History.Remove(token);
            _context.SaveChanges();
            return true;
        }

        public ICollection<History> GetTokensHistory()
        {
            return _context.History.OrderBy(x => x.TokenId).ToList();
        }
    }
}
