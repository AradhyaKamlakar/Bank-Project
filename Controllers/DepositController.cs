using Bank.Interfaces;
using Bank.Model;
using Microsoft.AspNetCore.Mvc;

namespace Bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepositController : Controller
    {
        public readonly IToken _itoken;

        public DepositController(IToken itoken)
        {
            _itoken = itoken;
        }

        [HttpPut("{Serviced}")]
        public IActionResult ChangeStatusService(int tokenId)
        {
            return Ok(_itoken.ChangeStatusToServiced(tokenId));
        }

        [HttpPut("{NoShow}")]
        public IActionResult ChangeStatusNoShow(int tokenId)
        {
            return Ok(_itoken.ChangeStatusToNoShowOrAbandoned(tokenId));
        }

        [HttpDelete]
        public IActionResult Delete(int tokenId)
        {
            return Ok(_itoken.DeleteT(tokenId));
        }

    }
}
