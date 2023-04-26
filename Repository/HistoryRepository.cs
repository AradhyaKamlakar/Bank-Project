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
        public void AddToTokenHistory(Token token)
        {
            History history = new History()
            {
                TokenId = token.TokenId,
                TokenNumber = token.TokenNumber,
                ServiceName = token.ServiceName,
                Status = token.Status,
                TokenGenerationTime = token.TokenGenerationTime,
                UserId = token.UserId,
            };
            _context.History.Add(history);
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

        public History GetTokenById()
        {
            return _context.History.OrderByDescending(t => t.TokenGenerationTime).FirstOrDefault();
        }
    }
}
