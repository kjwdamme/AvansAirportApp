using FlightManagement.Models;
using FlightManagement.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManagement.Controllers
{
    [Route("api")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        public FlightController(FlightRepository repo)
        {
            this.Repository = repo;
        }

        public FlightRepository Repository { get; set; }

        [HttpPost("airlines/{id}/flights")]
        public IActionResult CreateFlight(int id, [FromBody] FlightModel flightModel)
        {
            if (!this.Repository.AirlineOwnsPlane(id, flightModel.PlaneName))
            {
                return this.Ok(new ResponseModel
                {
                    Success = false,
                    Message = "The airline does not own that plane"
                });
            }

            this.Repository.AddFlight(id, flightModel);

            return this.Ok(new ResponseModel
            {
                Message = "Added flight",
                Success = true
            });
        }
    }
}
