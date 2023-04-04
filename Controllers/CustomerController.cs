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
        public IActionResult CreateToken(int UserId, int ServiceId) 
        {
            if (_itoken.CreateToken(UserId,ServiceId))
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
