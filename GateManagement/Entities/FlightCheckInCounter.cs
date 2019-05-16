using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GateManagement.Entities
{
    public class FlightCheckInCounter
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int FlightId { get; set; }
        [Required]
        public DateTime OpeningTime { get; set; }
        [Required]
        public DateTime ClosingTime { get; set; }

        public CheckInCounter CheckInCounter { get; set; }
        [Required]
        public int CheckInCounterId { get; set; }
    }
}
