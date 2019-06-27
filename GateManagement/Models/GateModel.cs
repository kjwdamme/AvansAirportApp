using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateManagement.Models
{
    public class GateModel
    {
        public string Number { get; set; }

        public IEnumerable<FlightGateModel> FlightGateModels { get; set; }
    }
}
