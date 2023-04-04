using Bank.Controllers;
using Bank.Data;
using Bank.Interfaces;
using Bank.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Bank.Repository
{
    public enum Status
    {
        Pending,
        NoShow,
        BeingServed,
        Serviced,
        Abandoned
    };
    public class TokenRepository: IToken
    {
        private readonly DataContext _context;
        public static List<Token> tokenQueue = new List<Token>();
        public TokenRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateToken(int UserId, int ServiceId)
        {
            var services = from service in _context.Services select service;
          
            string serviceName = "";
            int waitingTime = 0;

            
            foreach(var service in services)
            {
                if(service.Id == ServiceId) 
                {
                    serviceName = service.ServiceName;
                    waitingTime = service.ServiceTime;
                }
            }

            Token token = new Token()
            {
                TokenNumber = TokenNumberGenerator(),
                ServiceName = serviceName,
                Status = (int)Status.Pending,
                WaitingTime = waitingTime,
                NoShowCount = 0,
                TokenGenerationTime = DateTime.Now,
                UserId = UserId,
            };
            AddToQueue(token);
            _context.Add(token);
            _context.SaveChanges();
            return true;
            
        }

        public ICollection<Token> GetTokens()
        {
            return _context.Tokens.OrderBy(p => p.TokenId).ToList();
        }

        public bool DeleteToken(Token token)
        {
            tokenQueue.Remove(token);
            _context.Tokens.Remove(token);
            _context.SaveChanges();
            return true;
        }

        public Token ChangeStatusToServiced(int tokenId)
        {
            Token token = GetToken(tokenId);
            token.Status = (int)Status.Serviced;
            _context.Tokens.Update(token);
            _context.SaveChanges(); 
            UpdateQueue();
            return(token);
        }

        public Token ChangeStatusToNoShowOrAbandoned(int tokenId)
        {
            Token token = GetToken(tokenId);
            if (token.NoShowCount < 3)
            {
                token.Status = (int)Status.NoShow;
                token.NoShowCount++;
                UpdateQueue();
                _context.Tokens.Update(token);
                _context.SaveChanges();
            }
            else
            {
                token.Status = (int)Status.Abandoned;
                UpdateQueue();
                _context.Tokens.Update(token);
                _context.SaveChanges();
            }
            return (token);
        }

        public Token DeleteT(int tokenId)
        {
            Token token = GetToken(tokenId);

            if (token.Status == (int)Status.Serviced || token.Status == (int)Status.Abandoned)
            {
                DeleteToken(token);
                return(token);
            }
            
            return (token);
        }

        public Token GetToken(int tokenId) 
        {
            var tokens = from token in _context.Tokens select token;
            foreach(var t in tokens)
            {
                if (t.TokenId == tokenId)
                {
                    return t;
                }    
            }
            return null;
        }

        public List<Token> UpdateQueue()
        {
            tokenQueue.Clear();
            var tokens = from token in _context.Tokens select token;
            foreach (var token in tokens)
            {
                tokenQueue.Add(token);
            }
            return tokenQueue;
        }
      

    public List<Token> AddToQueue(Token token)
        {
            if (tokenQueue.IsNullOrEmpty())
            {
                token.WaitingTime = 0;
                tokenQueue.Add(token);
                return tokenQueue.ToList();
            }
            else
            {
                tokenQueue.Add(token);
                return tokenQueue.ToList();
            }
        }

        public int TokenNumberGenerator()
        {
            tokenGen:
            Random rnd = new Random();
            int tokenNumber = rnd.Next(10000, 99999);
            var tokens = from token in _context.Tokens select token;
            foreach(var t in tokens)
            {
                if(t.TokenNumber == tokenNumber)
                {
                    goto tokenGen;
                }
            }
            return tokenNumber;
        }
    }
}
