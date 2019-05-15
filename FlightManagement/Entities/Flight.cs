using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManagement.Entities
{
    public class Flight
    {
        [Key]
        public int FlightId { get; set; }

        public DateTime DepartureDate { get; set; }
        public DateTime ArrivalDate { get; set; }
        [Required]
        public int DurationMinutes { get; set; }
        public int DelayMinutes { get; set; }
        [MaxLength(255)]
        [Required]
        public string Destination { get; set; }
        [Required]
        public bool IsArriving { get; set; }

        [Required]
        public Airline Airline { get; set; }
        [Required]
        public int AirlineId { get; set; }

        [Required]
        public Plane Plane { get; set; }
        [Required]
        public int PlaneId { get; set; }
    }
}
