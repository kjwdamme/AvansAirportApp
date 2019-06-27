using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManagement.Models
{
    public class PlaneModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MaxBaggageWeight { get; set; }
        public int MaxPassengers { get; set; }
        public int Amount { get; set; }
    }
}
