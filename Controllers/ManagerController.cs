using Bank.Interfaces;
using Bank.Model;
using Microsoft.AspNetCore.Mvc;

namespace Bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController: Controller
    {
        public readonly IService _iservice;
        public ManagerController(IService service) 
        {
            _iservice = service;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Service>))]
        public IActionResult Getservices() 
        {
            var services = _iservice.Getservices();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(services);
        }

        [HttpPost]
        public IActionResult CreateService(Service model)
        {
            // Do some validation on the incoming model
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            if (_iservice.CreateService(model))
            {
                return Ok("Sucess");
            }
            else
            {
                return BadRequest(ModelState);
            }
            // Return a 201 Created status code and the created model
           // return CreatedAtAction(nameof(CreateService), new { id = model.Id }, model);
        }

    }
}
