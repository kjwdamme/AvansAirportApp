using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManagement.Models
{
    public class FlightModel
    {
        public int Id { get; set; }
        public DateTime DepartureDate { get; set; }
        public TimeSpan Duration { get; set; }
        public TimeSpan Delay { get; set; }
        public string Destination { get; set; }
        public bool IsArriving { get; set; }
        public AirlineModel AirlineModel { get; set; }
        public int PlaneId { get; set; }
        public PlaneModel PlaneModel { get; set; }
    }
}
