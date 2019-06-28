using FlightManagement.Entities;
using FlightManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManagement.Repositories
{
    public class AirlineRepository
    {
        public AirlineRepository(FlightWriteContext entities)
        {
            this.Entities = entities;
        }

        public FlightWriteContext Entities { get; }

        public AirlineModel AddAirline(AirlineModel airline)
        {
            if (!this.Entities.Airlines.Any(a => a.Name == airline.Name))
            {
                this.Entities.Airlines.Add(new Airline
                {
                    Name = airline.Name,
                    Flights = null,
                    AirlinePlanes = null
                });
                this.Entities.SaveChanges();
                return airline;
            }

            return null;
        }

        public IEnumerable<AirlineModel> GetAirlines()
        {
            return this.Entities.Airlines
                .Select(a => new AirlineModel
                {
                    Id = a.Id,
                    Name = a.Name,
                    BookingInformation = a.Flights.Select(f => new BookingInformationModel
                    {
                        FlightId = f.FlightId,
                        MaxBagageWeightKilograms = f.Plane.MaxBaggageWeight,
                        MaxPassengers = f.Plane.MaxPassengers
                    })
                });
        }

        public IEnumerable<AirlineModel> GetAirlineFlightInformation()
        {
            return this.Entities.Airlines
                .Select(a => new AirlineModel
                {
                    Id = a.Id,
                    Name = a.Name,
                    FlightModels = a.Flights.Select(f => new FlightModel
                    {
                        Id = f.FlightId,
                        Destination = f.Destination,
                        DurationMinutes = f.DurationMinutes,
                        Cost = f.Cost
                    })
                });
        }

        public PlaneModel AddNewPlane(int airlineId, PlaneModel planeModel)
        {
            this.Entities.AirlinePlanes.Add(new AirlinePlane
            {
                AirlineId = airlineId,
                PlaneId = this.GetOrAddPlane(planeModel),
                Amount = planeModel.Amount
            });
            this.Entities.SaveChanges();

            return planeModel;
        }

        private int GetOrAddPlane(PlaneModel plane)
        {
            int id = this.Entities.Planes
                .Where(p => p.Id == plane.Id)
                .Select(p => p.Id)
                .SingleOrDefault();

            if (id == 0)
            {
                Plane tempPlane = new Plane
                {
                    MaxBaggageWeight = plane.MaxBaggageWeight,
                    MaxPassengers = plane.MaxPassengers,
                    Name = plane.Name
                };

                this.Entities.Planes.Add(tempPlane);
                this.Entities.SaveChanges();
                id = tempPlane.Id;
            }

            return id;
        }
    }
}
