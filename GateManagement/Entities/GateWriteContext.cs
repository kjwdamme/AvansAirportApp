using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateManagement.Entities
{
    public class GateWriteContext : DbContext
    {
        public GateWriteContext(DbContextOptions<GateWriteContext> options) : base(options)
        { }

        public DbSet<CheckInCounter> CheckInCounters { get; set; }
        public DbSet<FlightCheckInCounter> FlightCheckInCounters { get; set; }
        public DbSet<Gate> Gates { get; set; }
        public DbSet<FlightGate> FlightGates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Gate>().HasData(
                new Gate { Number = "A1"},
                new Gate { Number = "A2"},
                new Gate { Number = "B1"},
                new Gate { Number = "B2"}
            );

            modelBuilder.Entity<CheckInCounter>().HasData(
                new CheckInCounter { Number = "1", BaggageDropOffPoint = true },
                new CheckInCounter { Number = "2", BaggageDropOffPoint = true }
            );
        }

        public void MigrateDb()
        {
            Database.Migrate();
        }
    }
}
