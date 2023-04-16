using Bank.Controllers;
using Bank.Data;
using Bank.Interfaces;
using Bank.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using static Bank.Repository.HistoryRepository;

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
        private readonly IHistory _ihistory;
        public static List<Token> tokenQueue = new List<Token>();
        public static Token CurrentToken = new Token();
        public static Token CurrentUserToken = new Token();
        public TokenRepository(DataContext context, IHistory ihistory)
        {
            _context = context;
            UpdateQueue();
            _ihistory = ihistory;
        }

        //This function creates the token for the user and add it to the list.
        public Token CreateToken(int UserId, int ServiceId)
        {

            var services = from service in _context.Services select service;
            var serviceName = "";
            foreach (var service in services)
            {
                if(service.Id == ServiceId)
                {
                    serviceName = service.ServiceName;
                    break;
                }
            }

            var waitingTime = 0;

            if(tokenQueue.Count != 0)
            {
                var serviceTime = 0;

                foreach (var service in services)
                {
                    if (service.ServiceName == tokenQueue[tokenQueue.Count - 1].ServiceName)
                    {
                        serviceTime = service.ServiceTime;
                        break;
                    }
                }
                waitingTime = tokenQueue[tokenQueue.Count - 1].WaitingTime + serviceTime;
            }

            Token token = new Token() {
                TokenNumber = TokenNumberGenerator(),
                UserId = UserId,
                ServiceName = serviceName,
                Status = (int)Status.Pending,
                WaitingTime = waitingTime,
                NoShowCount = 0,
                TokenGenerationTime = DateTime.Now,
            };

            tokenQueue.Add(token);
            _context.Tokens.Add(token);
            _context.SaveChanges();

            return token; 
        }

        public ICollection<Token> GetTokens()
        {
            List<Token> tokens = tokenQueue.ToList();
            return tokenQueue.ToList();
        }

        public void SetCurrentToken(Token t)
        {
            CurrentToken = t;
        }

        public Token GetCurrentToken() {
            return CurrentToken;
        }


        public void SetCurrentUserToken(Token t)
        {
            CurrentUserToken = t;
        }

        public Token GetCurrentUserToken()
        {
            return CurrentUserToken;
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

            //write code to add token to history
            _ihistory.AddToTokenHistory(token);
            DeleteT(tokenId);
            _context.SaveChanges(); 
            UpdateQueue();

            CurrentUserToken = new Token();
            CurrentToken = new Token();

            return (token);
        }

        public Token ChangeStatusToNoShowOrAbandoned(int tokenId)
        {
            var tokens = _context.Tokens;

            Token token = _context.Tokens.SingleOrDefault((t) => t.TokenId == tokenId);
     
            if(token.Status == (int)Status.Pending)
            {
                token.Status = (int)Status.NoShow;
                token.NoShowCount += 1;  
            }

            else if(token.Status == (int)Status.NoShow && token.NoShowCount < 3)
            {
                token.NoShowCount += 1;
            }

            else
            {
                token.Status = (int)Status.Abandoned;
            }


            tokenQueue.RemoveAt(0);
            if(tokenQueue.Count == 0)
            {
                tokenQueue.Add(token);
            }
            else
            {
                int serviceTime = 0;
                RearrangeTokenQueue();
                if (tokenQueue.Count() == 1)
                {
                    serviceTime = 0;
                    token.WaitingTime = serviceTime;
                }
                else
                {
                    Service service = _context.Services.SingleOrDefault((ser) => ser.ServiceName == tokenQueue[tokenQueue.Count - 1].ServiceName);
                    serviceTime = service.ServiceTime;
                    token.WaitingTime = serviceTime + tokenQueue[tokenQueue.Count - 1].WaitingTime;
                }
                
                
                tokenQueue.Add(token);
            }

            CurrentUserToken = new Token();
            CurrentToken = token;
            _context.Tokens.Update(token);
            _context.SaveChanges();

            return token;
            
        }

        public void RearrangeTokenQueue()
        {
            for(int i = 0; i < tokenQueue.Count; i++)
            {
                if(i == 0)
                {
                    tokenQueue[i].WaitingTime = 0;
                }
                else
                {
                    Service service = _context.Services.SingleOrDefault((ser) => ser.ServiceName == tokenQueue[i -1].ServiceName);
                    int serviceTime = service.ServiceTime;
                    tokenQueue[i].WaitingTime = serviceTime + tokenQueue[i-1].WaitingTime;
                }
            }

        }


        public void AddLast()
        {
            Token first = tokenQueue[0];
            tokenQueue.RemoveAt(0);
            WaitingTimeGenerator();
            var services = _context.Services;
            var serviceTime = 0;
            foreach (var ser in services)
            {
                if (ser.ServiceName == tokenQueue[tokenQueue.Count - 1].ServiceName)
                {
                    serviceTime = ser.ServiceTime;
                    break;
                }
            }
            first.WaitingTime = tokenQueue[tokenQueue.Count - 1].WaitingTime + serviceTime;
            _context.Tokens.Update(first);
            _context.SaveChanges();

            tokenQueue.Add(first);
        }

        public bool DeleteT(int tokenId)
        {
            Token token = GetToken(tokenId);
            
            if (token.Status == (int)Status.Serviced || token.Status == (int)Status.Abandoned)
            {
                tokenQueue.Remove(token);
                _context.Tokens.Remove(token);
                WaitingTimeGenerator();
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public List<Token> UpdateQueue()
        {
            tokenQueue.Clear();
            var tokens = from token in _context.Tokens 
                         orderby token.WaitingTime
                         select token;
            foreach (var token in tokens)
            {
                tokenQueue.Add(token);
            }
            return tokenQueue;
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

        public void WaitingTimeGenerator()
        {

            var database_wala_token = from token in _context.Tokens select token;
            var services = from service in _context.Services select service;
            for(int i=0;i<tokenQueue.Count;i++) 
            {
                if(i == 0)
                {
                    tokenQueue[i].WaitingTime = 0;
                }
                else
                {
                    int serviceTime = 0;
                    foreach(var ser in services) 
                    {
                        if(ser.ServiceName == tokenQueue[i-1].ServiceName)
                        {
                            serviceTime = ser.ServiceTime; 
                            break;
                        }
                    }
                    tokenQueue[i].WaitingTime = serviceTime + tokenQueue[i-1].WaitingTime;
                }
            }
            foreach(var t in database_wala_token)
            {
                for(int i = 0; i < tokenQueue.Count; i++)
                {
                    if (tokenQueue[i].TokenId == t.TokenId)
                    {
                        t.WaitingTime = tokenQueue[i].WaitingTime;
                        _context.Tokens.Update(t);
                    }
                }
            }
           
            _context.SaveChanges();
        }
        
        public void WaitingTimeAfterNoShow()
        {
            var tokens = _context.Tokens;   
            var noShowCountToken = _context.Tokens.FirstOrDefault();
            var newrows = from t in _context.Tokens.Skip(1) select t;
            List<Token> list2 = new List<Token>();
            foreach(var t in newrows)
            {
                list2.Add(t);
            }
            WaitingTimeGenerator();
            foreach (var t in tokens)
            {
                for (int i = 0; i < list2.Count; i++)
                {
                    if(i == 0)
                    {
                        continue;
                    }
                    else if (list2[i].TokenId == t.TokenId)
                    {
                        t.WaitingTime = list2[i].WaitingTime;
                        _context.Tokens.Update(t);
                    }
                }
            }
            int time = 0;
            var servicvetime = from ser in _context.Services select ser;
            foreach (var t in servicvetime)
            {
                if(t.ServiceName == list2[list2.Count- 1].ServiceName) 
                {
                    time = t.ServiceTime; break;
                }
            }
            noShowCountToken.WaitingTime = list2[list2.Count- 1].WaitingTime + time;
            _context.Tokens.Update(noShowCountToken);

            UpdateQueue();
            _context.SaveChanges();
        }

        
    }
}
