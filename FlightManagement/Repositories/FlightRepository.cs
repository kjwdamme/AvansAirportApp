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
        public FlightRepository(FlightWriteContext writeContext)
        {
            this.WriteContext = writeContext;
        }

        public FlightWriteContext WriteContext { get; }

        public FlightModel AddFlight(int airlineId, FlightModel flightModel)
        {
            Flight flightToAdd = new Flight
            {
                AirlineId = airlineId,
                DelayMinutes = flightModel.DelayMinutes,
                DepartureDate = flightModel.DepartureDate,
                Destination = flightModel.Destination,
                DurationMinutes = flightModel.DurationMinutes,
                Cost = flightModel.Cost,
                PlaneId = this.WriteContext.Planes.Where(p => p.Name == flightModel.PlaneName).Select(p => p.Id).SingleOrDefault()
            };

            this.WriteContext.Flights.Add(flightToAdd);
            this.WriteContext.SaveChanges();

            return new FlightModel
            {
                Id = flightToAdd.FlightId,
                DepartureDate = flightToAdd.DepartureDate
            };
        }

        public bool AirlineOwnsPlane(int airlineId, string planeName)
        {
            return this.WriteContext.AirlinePlanes.Any(ap => ap.AirlineId == airlineId && ap.Plane.Name == planeName);
        }

        public FlightModel GetFlight(int flightId)
        {
            return this.WriteContext.Flights
                .Where(f => f.FlightId == flightId)
                .Select(flight => new FlightModel()
                {
                    Id = flight.FlightId,
                    AirlineModel = new AirlineModel()
                    {
                        Id = flight.Airline.Id,
                        Name = flight.Airline.Name
                    },
                    PlaneModel = new PlaneModel()
                    {
                        Id = flight.Plane.Id,
                        MaxPassengers = flight.Plane.MaxPassengers,
                        MaxBaggageWeight = flight.Plane.MaxBaggageWeight,
                        Name = flight.Plane.Name
                    },
                    Destination = flight.Destination,
                    DelayMinutes = flight.DelayMinutes,
                    DepartureDate = flight.DepartureDate,
                    Cost = flight.Cost
                })
                .SingleOrDefault();
        }
    }
}
