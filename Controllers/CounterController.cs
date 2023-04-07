using Bank.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CounterController: ControllerBase
    {
        public readonly IToken _itoken;

        public CounterController(IToken itoken)
        {
            _itoken = itoken;
        }

        [HttpPut("serviced")]
        public IActionResult ChangeStatusService(int tokenId)
        {
           
            return Ok(_itoken.ChangeStatusToServiced(tokenId));
        }

        [HttpGet("no-show/{tokenId}")]
        public IActionResult ChangeStatusNoShow(int tokenId)
        {
            return Ok(_itoken.ChangeStatusToNoShowOrAbandoned(tokenId));
        }

        [HttpGet("get-current-user-token")]
        public IActionResult GetCurrentUserToken()
        {
            return Ok(_itoken.GetCurrentUserToken());
        }
    }
}
