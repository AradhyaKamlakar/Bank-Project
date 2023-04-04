using Bank.Interfaces;
using Bank.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CashAllListController: Controller
    {
        public readonly IToken _itoken;
        public static  Queue<Token> tokenQueue = new Queue<Token>();
        public CashAllListController(IToken itoken)
        {
            _itoken = itoken;
        }
        //public void UpdateQueue()
        //{
        //    var tokens = from token in _itoken. select token;
        //    foreach(var token in tokens)
        //    {
        //        tokenQueue.Enqueue(token);
        //    }
        //}

        [HttpPost]
        public IActionResult AddToQueue(Token token)
        {
            if (tokenQueue.IsNullOrEmpty())
            {
                token.WaitingTime = 0;
                tokenQueue.Enqueue(token);
                return Ok(tokenQueue.ToList());
            }
            else
            {
                tokenQueue.Enqueue(token);
                return Ok(tokenQueue.ToList());
            }
        }
    }
}
