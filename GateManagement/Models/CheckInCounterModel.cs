using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateManagement.Models
{
    public class CheckInCounterModel
    {
        public string Number { get; set; }
        public bool BaggageDropOffPoint { get; set; }

        public IEnumerable<FlightCheckInCounterModel> FlightCheckInCounterModels { get; set; }
    }
}
