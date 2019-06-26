using GateManagement.Models;
using GateManagement.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateManagement.Controllers
{
    [ApiController]
    [Route("api/checkincounters")]
    public class CheckInCounterController : ControllerBase
    {

        public CheckInCounterController(CheckInCounterRepository repo)
        {
            this.Repository = repo;
        }

        public CheckInCounterRepository Repository { get; }

        [HttpPost("{flightId}")]
        public IActionResult AssignCheckInCounter(int flightId, [FromBody] FlightCheckInCounterModel flightGate)
        {
            this.Repository.AssignCheckInCounter(flightId, flightGate.OpeningTime, flightGate.ClosingTime);

            return this.Ok(new ResponseModel
            {
                Message = "Assigned gate",
                Success = true
            });
        }
    }
}
