using Bank.Data;
using Bank.Interfaces;
using Bank.Model;
using Microsoft.AspNetCore.Mvc;

namespace Bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {

        public readonly IToken _itoken;

        public CustomerController(IToken itoken)
        {
            _itoken = itoken;
        }
    
        [HttpPost]
        public IActionResult CreateToken(Token token) 
        {
            if (_itoken.CreateToken(token))
            {
                return Ok("Sucess");
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


    }
}
