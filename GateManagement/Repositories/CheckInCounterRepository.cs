using GateManagement.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateManagement.Repositories
{
    public class CheckInCounterRepository
    {
        public CheckInCounterRepository(GateWriteContext entities)
        {
            this.Entities = entities;
        }

        public GateWriteContext Entities { get; }

        public void AssignCheckInCounter(int flightId, DateTime openingTime, DateTime closingTime)
        {
            Random rand = new Random();

            this.Entities.FlightCheckInCounters.Add(new FlightCheckInCounter
            {
                ClosingTime = closingTime,
                OpeningTime = openingTime,
                FlightId = flightId,
                CheckInCounterNumber = this.Entities.CheckInCounters.ToList()[rand.Next(this.Entities.CheckInCounters.Count())].Number
            });

            this.Entities.SaveChanges();
        }

        //private List<CheckInCounter> GetOpenCheckInCounters()
        //{
        //    DateTime curr = DateTime.UtcNow;

        //    return this.Entities.CheckInCounters
        //        .Where(g => g.FlightCheckInCounters.Any(fcc => curr < fcc.OpeningTime || curr > fcc.ClosingTime))
        //        .ToList();
        //}
    }
}
