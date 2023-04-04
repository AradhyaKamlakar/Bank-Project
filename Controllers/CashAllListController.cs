using Bank.Interfaces;
using Bank.Model;
using Bank.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CashAllListController: Controller
    {
        public readonly IToken _itoken;
       
        public CashAllListController(IToken itoken)
        {
            _itoken = itoken;
        }
    }
}
