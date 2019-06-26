using FlightManagement.Entities;
using FlightManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManagement.Repositories
{
    public class FlightRepository
    {
        public FlightRepository(FlightWriteContext entitites)
        {
            this.Entities = entitites;
        }

        public FlightWriteContext Entities { get; set; }

        public FlightModel AddFlight(int airlineId, FlightModel flightModel)
        {
            Flight flightToAdd = new Flight
            {
                AirlineId = airlineId,
                DelayMinutes = flightModel.DelayMinutes,
                DepartureDate = flightModel.DepartureDate,
                Destination = flightModel.Destination,
                DurationMinutes = flightModel.DurationMinutes,
                PlaneId = this.Entities.Planes.Where(p => p.Name == flightModel.PlaneName).Select(p => p.Id).SingleOrDefault()
            };

            this.Entities.Flights.Add(flightToAdd);
            this.Entities.SaveChanges();

            return new FlightModel
            {
                Id = flightToAdd.FlightId,
                DepartureDate = flightToAdd.DepartureDate
            };
        }

        public bool AirlineOwnsPlane(int airlineId, string planeName)
        {
            return this.Entities.AirlinePlanes.Any(ap => ap.AirlineId == airlineId && ap.Plane.Name == planeName);
        }
    }
}
