namespace FlightManagement.Models
{
    public class AirlinePlaneModel
    {
        public int AirlineId { get; set; }
        public AirlineModel AirlineModel { get; set; }

        public int PlaneId { get; set; }
        public PlaneModel PlaneModel { get; set; }

        public int Amount { get; set; }
    }
}
