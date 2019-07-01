using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManagement.Models
{
    public class AirlineModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<FlightModel> FlightModels { get; set; }
    }
}
