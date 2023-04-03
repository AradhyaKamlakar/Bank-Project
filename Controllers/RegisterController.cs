using Bank.Interfaces;
using Bank.Model;
using Bank.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController: Controller
    {
        public readonly IUser _iuser;
        public RegisterController(IUser ur) 
        {
            this._iuser = ur;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public IActionResult GetAllUsers() 
        {
            var users = _iuser.GetUsers();

            return Ok(users);
        }

    }
}
