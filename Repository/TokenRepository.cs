using Bank.Data;
using Bank.Interfaces;
using Bank.Model;

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
            _context.SaveChanges();
            return true;
            
        }

        public ICollection<Token> GetTokens()
        {
            return _context.Tokens.OrderBy(p => p.TokenId).ToList();
        }
    }
}
