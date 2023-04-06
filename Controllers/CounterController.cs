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

        [HttpPut("no-show")]
        public IActionResult ChangeStatusNoShow(int tokenId)
        {
            return Ok(_itoken.ChangeStatusToNoShowOrAbandoned(tokenId));
        }
    }
}
