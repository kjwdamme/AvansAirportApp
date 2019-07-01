using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManagement.Entities
{
    public class Airline
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        public ICollection<AirlinePlane> AirlinePlanes { get; set; }
        public ICollection<Flight> Flights { get; set; }
    }
}
