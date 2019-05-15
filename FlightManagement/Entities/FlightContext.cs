using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManagement.Entities
{
    public class FlightContext : DbContext
    {
        public FlightContext(DbContextOptions<FlightContext> options) : base(options)
        { }

        public DbSet<Airline> Airlines { get; set; }
        public DbSet<AirlinePlane> AirlinePlanes { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Plane> Planes { get; set; }
    }
}
