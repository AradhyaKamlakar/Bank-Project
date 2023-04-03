using Bank.Data;
using Bank.Interfaces;
using Bank.Model;

namespace Bank.Repository
{
    public class TokenRepository: IToken
    {
        private readonly DataContext _context;
        public TokenRepository(DataContext context)
        {
            _context = context;
        }
        public bool CreateToken(Token token)
        {
            _context.Add(token);
            _context.SaveChanges();
            return true;
            
        }

        public ICollection<Token> GetTokens()
        {
            return _context.Tokens.OrderBy(p => p.TokenId).ToList();
        }
    }
}
