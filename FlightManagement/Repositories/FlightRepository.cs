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
            this.Entities.Flights.Add(new Flight
            {
                AirlineId = airlineId,
                ArrivalDate = flightModel.ArrivalDate,
                DelayMinutes = flightModel.DelayMinutes,
                DepartureDate = flightModel.DepartureDate,
                Destination = flightModel.Destination,
                DurationMinutes = flightModel.DurationMinutes,
                IsArriving = flightModel.IsArriving,
                PlaneId = this.Entities.Planes.Where(p => p.Name == flightModel.PlaneName).Select(p => p.Id).SingleOrDefault()
            });

            this.Entities.SaveChanges();

            return flightModel;
        }

        public bool AirlineOwnsPlane(int airlineId, string planeName)
        {
            return this.Entities.AirlinePlanes.Any(ap => ap.AirlineId == airlineId && ap.Plane.Name == planeName);
        }
    }
}
