using Bank.Model;

namespace Bank.Interfaces
{
    public interface IToken
    {
        ICollection<Token> GetTokens();

        public bool CreateToken(int UserId, int ServiceId);
        public bool DeleteToken(Token token);

        public Token ChangeStatusToServiced(int tokenId);

        public Token ChangeStatusToNoShowOrAbandoned(int tokenId);
        public Token DeleteT(int tokenId);
        public Token GetToken(int tokenId);

        public List<Token> AddToQueue(Token token);
        public List<Token> UpdateQueue();

        public int TokenNumberGenerator();
    }
}
