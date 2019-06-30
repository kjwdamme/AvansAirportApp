using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateManagement.Models
{
    public class FlightGateModel
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public DateTime OpeningTime { get; set; }
        public DateTime ClosingTime { get; set; }

        public GateModel GateModel { get; set; }
        public string GateNumber { get; set; }
    }
}
