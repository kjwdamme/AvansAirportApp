using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GateManagement.Entities
{
    public class CheckInCounter
    {
        [Key]
        public string Number { get; set; }
        [Required]
        public bool BaggageDropOffPoint { get; set; }

        public ICollection<FlightCheckInCounter> FlightCheckInCounters { get; set; }
    }
}
