using Bank.Interfaces;
using Bank.Model;
using Bank.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ATMController: Controller
    {
        public readonly IToken _itoken;

        public ATMController(IToken itoken)
        {
            _itoken = itoken;
        }

        [HttpPut("route1")]
        public IActionResult ChangeStatusService(int tokenId)
        {
            return Ok(_itoken.ChangeStatusToServiced(tokenId));
        }

        [HttpPut("route2")]
        public IActionResult ChangeStatusNoShow(int tokenId)
        {
            return Ok(_itoken.ChangeStatusToNoShowOrAbandoned(tokenId));
        }

        [HttpDelete]
        public IActionResult Delete(int tokenId)
        {
            ChangeStatusService(tokenId);
            return Ok(_itoken.DeleteT(tokenId));
        }
    }
}
