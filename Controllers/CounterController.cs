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

        [HttpGet("serviced/{tokenId}")]
        public IActionResult ChangeStatusService(int tokenId)
        {    
            return Ok(_itoken.ChangeStatusToServiced(tokenId));
        }

        [HttpGet("no-show/{tokenId}")]
        public IActionResult ChangeStatusNoShow(int tokenId)
        {
            _itoken.ChangeStatusToNoShowOrAbandoned(tokenId);
            _itoken.DeleteT(tokenId);
            return Ok(_itoken.DeleteT(tokenId));
        }

        [HttpGet("get-current-user-token")]
        public IActionResult GetCurrentUserToken()
        {
            return Ok(_itoken.GetCurrentUserToken());
        }
    }
}
