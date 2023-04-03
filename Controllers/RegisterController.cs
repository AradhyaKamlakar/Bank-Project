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
        [HttpPost]
        public IActionResult CreateUser(User model)
        {
            if (_iuser.CreateUser(model))
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
