using Bank.Interfaces;
using Bank.Model;
using Bank.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        public readonly IUser _iuser;
        public LoginController(IUser iuser)
        {
            _iuser = iuser;
        }

        [HttpPost("login")]
       public IActionResult Login(UserSchema u)
        {
            var existingUser = _iuser.GetUsers();

            if(existingUser == null)
            {
                return NotFound();
            }

            foreach(var user in existingUser)
            {
                if(user.Name == u.Name && user.Password == u.Password ) 
                {
                    return Ok(user);
                }
            }
            return NotFound();
        }

        [HttpPost("getUser")]
        public IActionResult GetUser(User u)
        {
            //var existingUser = _iuser.GetUsers();
            //foreach (var user in existingUser)
            //{
            //    if (user.Id == u.Id)
            //    {
            //        return Ok(user);
            //    }
            //}
            var _user = _iuser.GetUserByUserId(u.Id);
            if(_user != null)
            {
                return Ok(_user);
            }
            return NotFound();
        }

        [HttpGet("get-user-by-id/{id}")]
        public IActionResult GetUserById(int id)
        {
            return Ok(_iuser.GetUserById(id));
        }


    }
}
