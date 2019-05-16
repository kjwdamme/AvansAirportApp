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
    }
}
