using GateManagement.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GateManagement.Models;

namespace GateManagement.Repositories
{
    public class GateRepository
    {
        public GateRepository( GateWriteContext writeContext,  GateReadContext readContext)
        {
            this.WriteContext = writeContext;
            this.ReadContext = readContext;
        }

        public GateWriteContext WriteContext { get; }

        public GateReadContext ReadContext { get; }    

        public void AssignGate(int flightId, DateTime openingTime, DateTime closingTime)
        {
            Random rand = new Random();

            this.WriteContext.FlightGates.Add(new FlightGate
            {
                ClosingTime = closingTime,
                OpeningTime = openingTime,
                FlightId = flightId,
                GateNumber = this.ReadContext.Gates.ToList()[rand.Next(this.WriteContext.Gates.Count())].Number
            });
            this.ReadContext.SaveChanges();
        }

        public IEnumerable<FlightGate> GetFlightGates()
        {
//            return this.ReadContext.FlightGates.Select(fg => new FlightGateModel
//            {
//                FlightId = fg.FlightId,
//                GateNumber = fg.GateNumber,
//                OpeningTime = fg.OpeningTime,
//                ClosingTime = fg.ClosingTime
//            });
            return this.ReadContext.FlightGates;
        }

        public IEnumerable<FlightCheckInCounter> GetFlightCheckInCounters()
        {
            return this.ReadContext.FlightCheckInCounters;
        }

        //private List<Gate> GetOpenGates()
        //{
        //    DateTime curr = DateTime.UtcNow;

        //    return this.Entities.Gates
        //        .Where(g => g.FlightGates.Any(fg => curr < fg.OpeningTime || curr > fg.ClosingTime))
        //        .ToList();
        //}
    }
}