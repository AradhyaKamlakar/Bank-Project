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

        //This function creates the token for the user and add it to the list.
        public Token CreateToken(int UserId, int ServiceId)
        {
            var services = from service in _context.Services select service;
          
            string serviceName = "";

            int serviceTime = 0;

            foreach(var service in services)
            {
                if(service.Id == ServiceId) 
                {
                    serviceName = service.ServiceName;
                    serviceTime = service.ServiceTime;
                }
            }

            //First Calculate waiting time required for new token
            int waitingTime = tokenQueue[tokenQueue.Count - 1].WaitingTime + serviceTime;
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
            tokenQueue.Add(token);
            //WaitingTimeGenerator(tokenQueue);
            _context.Tokens.Add(token);
            _context.SaveChanges();
            return token;
            
        }

        public ICollection<Token> GetTokens()
        {
            return _context.Tokens.OrderBy(p => p.TokenId).ToList();
        }

        public Token GetToken(int tokenId)
        {
            var tokens = from token in _context.Tokens select token;
            foreach (var t in tokens)
            {
                if (t.TokenId == tokenId)
                {
                    return t;
                }
            }
            return null;
        }

        public Token GetTokenByUserId(int userId)
        {
            var tokens = from token in _context.Tokens select token;
            foreach (var t in tokens)
            {
                if (t.UserId == userId)
                {
                    return t;
                }
            }
            return null;
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
           // Token token = GetToken(tokenId);
            var tokens = from t in _context.Tokens select t;
            foreach (var t in tokens)
            {
                if(t.TokenId == tokenId)
                {
                    if(t.NoShowCount < 3)
                    {
                        t.Status = (int)Status.NoShow;
                        t.NoShowCount++;
                        _context.Tokens.Update(t);
                        _context.SaveChanges();
                        return(t);
                    }
                    else
                    {
                        t.Status = (int)Status.Abandoned;
                        _context.Tokens.Update(t);
                        DeleteT(tokenId);
                        _context.SaveChanges();
                        return null;
                    }
                }
            }
            return null;
            
        }
        public bool DeleteToken(Token token)
        {

            tokenQueue.Remove(token);
            _context.Tokens.Remove(token);
            WaitingTimeGenerator(tokenQueue);
            _context.SaveChanges();
            return true;
        }

        public void DeleteT(int tokenId)
        {
            Token token = GetToken(tokenId);

            if (token.Status == (int)Status.Serviced || token.Status == (int)Status.Abandoned)
            {
                DeleteToken(token);
                
            }
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
      

    //public List<Token> AddToQueue(Token token)
    //    {
    //        if (tokenQueue.IsNullOrEmpty())
    //        {
    //            token.WaitingTime = 0;
    //            tokenQueue.Add(token);
    //            return tokenQueue.ToList();
    //        }
    //        else
    //        {
    //            tokenQueue.Add(token);
    //            return tokenQueue.ToList();
    //        }
    //    }

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

        public void WaitingTimeGenerator(List<Token> tokens)
        {
            var database_wala_token = from token in _context.Tokens select token;
            var services = from service in _context.Services select service;
            for(int i=0;i<tokens.Count;i++) 
            {
                if(i == 0)
                {
                    tokens[i].WaitingTime = 0;
                }
                else
                {
                    int serviceTime = 0;
                    foreach(var t in services) 
                    {
                        if(t.ServiceName == tokens[i-1].ServiceName)
                        {
                            serviceTime = t.ServiceTime; 
                            break;
                        }
                    }
                    tokens[i].WaitingTime = serviceTime + tokens[i-1].WaitingTime;
                }
            }
            foreach(var t in database_wala_token)
            {
                for(int i = 0; i < tokens.Count; i++)
                {
                    if (tokens[i].TokenId == t.TokenId)
                    {
                        t.WaitingTime = tokens[i].WaitingTime;
                        _context.Tokens.Update(t);
                    }
                }
            }
           
            _context.SaveChanges();
        }
        
        
    }
}
