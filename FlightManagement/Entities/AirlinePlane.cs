using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManagement.Entities
{
    public class AirlinePlane
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AirlinePlaneId { get; set; }

        [Required]
        public Airline Airline { get; set; }
        [Required]
        public int AirlineId { get; set; }

        [Required]
        public Plane Plane { get; set; }
        [Required]
        public int PlaneId { get; set; }

        [Required]
        public int Amount { get; set; }
    }
}
