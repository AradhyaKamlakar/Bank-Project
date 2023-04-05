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

        [HttpGet("create-token/{UserId}/{ServiceId}")]
        public IActionResult CreateToken(int UserId, int ServiceId)
        {
            Token t = _itoken.CreateToken(UserId, ServiceId);
            if (Convert.ToBoolean(t))
            {
                return Ok(t);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [HttpGet("find-token/{UserId}")]
        public IActionResult FindToke (int UserId)
        {
            Token t = _itoken.GetTokenByUserId(UserId);

            return Ok(t);
        }


    }
}
