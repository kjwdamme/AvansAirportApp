using System.Collections.Generic;
using GateManagement.Models;
using GateManagement.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace GateManagement.Controllers
{
    [ApiController]
    [Route("api")]
    public class GateController : ControllerBase
    {
        public GateController(GateRepository repo)
        {
            this.Repository = repo;
        }
        
        public GateRepository Repository { get; }

        [HttpGet("gates")]
        public IActionResult GetFlightGates()
        {
            return this.Ok(this.Repository.GetFlightGates());
        }

        [HttpGet("counters")]
        public IActionResult GetFlightCheckInCounters()
        {
            return this.Ok(this.Repository.GetFlightCheckInCounters());
        }
    }
}