using Bank.Model;

namespace Bank.Interfaces
{
    public interface IToken
    {
        ICollection<Token> GetTokens();

        public Token CreateToken(int UserId, int ServiceId);
        public bool DeleteToken(Token token);

        public Token ChangeStatusToServiced(int tokenId);

        public Token ChangeStatusToNoShowOrAbandoned(int tokenId);
        public void DeleteT(int tokenId);
        public Token GetToken(int tokenId);

        public Token GetTokenByUserId(int userId);
        public void SetCurrentToken(Token t);

        public Token GetCurrentToken();
        public void SetCurrentUserToken(Token t);

        public Token GetCurrentUserToken();

       // public List<Token> AddToQueue(Token token);
        public List<Token> UpdateQueue();

        public int TokenNumberGenerator();
    }
}
