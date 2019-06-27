using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GateManagement.Entities
{
    public class Gate
    {
        [Key]
        public string Number { get; set; }

        public ICollection<FlightGate> FlightGates { get; set; }
    }
}
