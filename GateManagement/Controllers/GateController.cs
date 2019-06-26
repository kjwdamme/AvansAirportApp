using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GateManagement.Entities;
using GateManagement.Models;
using GateManagement.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace GateManagement.Controllers
{
    [Route("api/gates")]
    [ApiController]
    public class GateController : ControllerBase
    {
        public GateController(GateRepository repo)
        {
            this.Repository = repo;
        }

        public GateRepository Repository { get; }

        [HttpPost("{flightId}")]
        public IActionResult AssignGate(int flightId, [FromBody] FlightGateModel flightGate)
        {
            this.Repository.AssignGate(flightId, flightGate.OpeningTime, flightGate.ClosingTime);

            return this.Ok(new ResponseModel
            {
                Message = "Assigned gate",
                Success = true
            });
        }
    }
}
