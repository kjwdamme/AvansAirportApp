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
        public int DurationMinutes { get; set; }
        public int DelayMinutes { get; set; }
        public string Destination { get; set; }
        public double Cost { get; set; }
        public AirlineModel AirlineModel { get; set; }
        public int AirlineId { get; set; }
        public int PlaneId { get; set; }
        public PlaneModel PlaneModel { get; set; }
        public string PlaneName { get; set; }
    }
}
