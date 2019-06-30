using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManagement.Models
{
    public class BookingInformationModel
    {
        public int FlightId { get; set; }
        public int MaxPassengers { get; set; }
        public int MaxBagageWeightKilograms { get; set; }
    }
}
