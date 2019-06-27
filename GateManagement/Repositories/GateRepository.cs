using GateManagement.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateManagement.Repositories
{
    public class GateRepository
    {
        public GateRepository(GateWriteContext entities)
        {
            this.Entities = entities;
        }

        public GateWriteContext Entities { get; }

        public void AssignGate(int flightId, DateTime openingTime, DateTime closingTime)
        {
            Random rand = new Random();

            this.Entities.FlightGates.Add(new FlightGate
            {
                ClosingTime = closingTime,
                OpeningTime = openingTime,
                FlightId = flightId,
                GateNumber = this.Entities.Gates.ToList()[rand.Next(this.Entities.Gates.Count())].Number
            });
            this.Entities.SaveChanges();
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