﻿using FlightManagement.Models;
using FlightManagement.Repositories;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using RabbitMQ.Client;
using FlightManagement.Services;

namespace FlightManagement.Controllers
{
    [Route("api")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        public FlightController(FlightRepository repo, QueueService queue)
        {
            this.Repository = repo;
            this.Queue = queue;
        }

        public FlightRepository Repository { get; }

        public QueueService Queue { get; set; }

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

            FlightModel addedFlight = this.Repository.AddFlight(id, flightModel);

            // Assigning a gate to the flight in the Gate Management service
            this.Queue.SendQueue("GateQueue", new FlightCreatedEvent
            {
                FlightId = addedFlight.Id,
                //Gate closes 30 minutes before departure
                ClosingTime = addedFlight.DepartureDate.AddMinutes(-30),
                //Gate opens 2 hours before departure
                OpeningTime = addedFlight.DepartureDate.AddHours(-2)
            });

            this.Queue.SendQueue("CheckInCounterQueue", new FlightCreatedEvent
            {
                FlightId = addedFlight.Id,
                //Check in counter closes 1 hour before departure
                ClosingTime = addedFlight.DepartureDate.AddHours(-1),
                //Gate opens 7 hours before departure
                OpeningTime = addedFlight.DepartureDate.AddHours(-7)
            });

            return this.Ok(new ResponseModel
            {
                //Message = "Added flight but could not reach the Gate Management service",
                Message = "Added flight, assigned gate and assigned check in counter",
                Success = true
            });
        }

        [HttpGet("flights/{id}")]
        public IActionResult GetFlight(int id)
        {
            return this.Ok(this.Repository.GetFlight(id));
        }
    }
}
