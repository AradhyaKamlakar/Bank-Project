using Bank.Interfaces;
using Bank.Model;
using Bank.Repository;
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

        [HttpPut("{id}")]
        public IActionResult Update(int id, Service updatedModel)
        {
            // Find the existing model in the database
            var existingModel = _iservice.Getservices();

            if (existingModel == null)
            {
                return NotFound();
            }

            // Update the existing model with the new data
            foreach(var item in existingModel) 
            {
                if(item.Id == id) 
                {
                    item.ServiceName = updatedModel.ServiceName;
                    item.ServiceTime = updatedModel.ServiceTime;
                    _iservice.UpdateService(item);

                }
               
            }
            return Ok(existingModel);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Find the model to delete
            var modelToDelete = _iservice.Getservices();
            foreach(var item in modelToDelete) 
            {
                if(item.Id == id)
                {
                    if(item == null) return NotFound();

                    else _iservice.DeleteService(item);
                }
            }

            // Return a 204 No Content response
            return NoContent();
        }


    }
}
