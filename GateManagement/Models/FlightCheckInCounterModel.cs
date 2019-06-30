using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateManagement.Models
{
    public class FlightCheckInCounterModel
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public DateTime OpeningTime { get; set; }
        public DateTime ClosingTime { get; set; }

        public CheckInCounterModel CheckInCounter { get; set; }
        public int CheckInCounterId { get; set; }
    }
}
