using FlightManagement.Models;
using FlightManagement.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FlightManagement.Controllers
{
    [Route("api/airlines")]
    [ApiController]
    public class AirlineController : ControllerBase
    {
        public AirlineController(AirlineRepository repo)
        {
            this.Repository = repo;
        }

        public AirlineRepository Repository { get; }

        [HttpPost]
        public IActionResult CreateAirline([FromBody] AirlineModel airline)
        {
            if (airline == null || airline.Name == null)
            {
                return this.Ok(new ResponseModel
                {
                    Success = false,
                    Message = "Please provide all information."
                });
            }

            else if (this.Repository.AddAirline(airline) != null)
            {
                return this.Ok(new ResponseModel
                {
                    Success = true,
                    Message = "Successfully added a new airline"
                });
            }
            else
            {
                return this.Ok(new ResponseModel
                    {
                        Success = false,
                        Message = "Airline with name \"" + airline.Name + "\" already exists."
                    });
            }
        }

        [HttpGet]
        public IActionResult GetAirlines()
        {
            return this.Ok(this.Repository.GetAirlines());
        }

        [HttpGet("flights")]
        public IActionResult GetAirlineFlights()
        {
            return this.Ok(this.Repository.GetAirlineFlightInformation());
        }

        [HttpPost("{id}/planes")]
        public IActionResult AssignPlane(int id, [FromBody] PlaneModel planeModel)
        {
            var plane = this.Repository.AddNewPlane(id, planeModel);

            if (plane != null)
            {
                return this.Ok(new ResponseModel
                {
                    Success = true,
                    Message = "Added plane and assigned to the airline"
                });
            }

            return this.Ok(new ResponseModel
            {
                Success = false,
                Message = "Something went wrong"
            });
        }
    }
}
