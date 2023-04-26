using Bank.Data;
using Bank.Interfaces;
using Bank.Model;
using Microsoft.AspNetCore.Mvc;

namespace Bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CustomerController : ControllerBase
    {

        public readonly IToken _itoken;
        public readonly IHistory _ihistory;

        public CustomerController(IToken itoken, IHistory ihistory)
        {
            _itoken = itoken;
            _ihistory= ihistory;
        }

        [HttpGet("create-token/{UserId}/{ServiceId}")]
        public IActionResult CreateToken(int UserId, int ServiceId)
        {
            Token t = _itoken.CreateToken(UserId, ServiceId);
            //if (t.ToString() != null)
            //{
            //    return Ok(t);
            //}
            //else
            //{
            //    return BadRequest(ModelState);
            //}
            return Ok(t);
        }


        [HttpGet("find-token/{UserId}")]
        public IActionResult FindToke (int UserId)
        {
            Token t = _itoken.GetTokenByUserId(UserId);

            return Ok(t);
        }

        [HttpGet("get-current-token")]
        public IActionResult GetCurrentToken()
        {
            return Ok(_itoken.GetCurrentToken());
        }

        [HttpPost("set-current-token")]
        public IActionResult SetCurrentUserToken(Token t)
        {
            _itoken.SetCurrentUserToken(t);
            return Ok("current user token set");
        }


        [HttpGet("get-history-token")]
        public IActionResult GetHistoryToken()
        {
            return Ok(_ihistory.GetTokenById());
        }

    }
}
