using Bank.Controllers;
using Bank.Data;
using Bank.Interfaces;
using Bank.Model;
using Microsoft.AspNetCore.Mvc;

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
                TokenNumber = 32423,
                ServiceName = serviceName,
                Status = (int)Status.Pending,
                WaitingTime = waitingTime,
                NoShowCount = 0,
                TokenGenerationTime = DateTime.Now,
                UserId = UserId,
            };
            _context.Add(token);
            CashAllListController.tokenQueue.Enqueue(token);
            _context.SaveChanges();
            return true;
            
        }

        public ICollection<Token> GetTokens()
        {
            return _context.Tokens.OrderBy(p => p.TokenId).ToList();
        }

        public bool DeleteToken(Token token)
        {
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

            return(token);
        }

        public Token ChangeStatusToNoShowOrAbandoned(int tokenId)
        {
            Token token = GetToken(tokenId);
            if (token.NoShowCount < 3)
            {
                token.Status = (int)Status.NoShow;
                token.NoShowCount++;
                _context.Tokens.Update(token);
                _context.SaveChanges();
            }
            else
            {
                token.Status = (int)Status.Abandoned;
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
                CashAllListController.tokenQueue.Dequeue();
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
    }
}
