using System;
using System.Linq;
using System.Threading.Tasks;
using EFCore.BulkExtensions;
using FlightManagement.Entities;
using Microsoft.Extensions.DependencyInjection;

namespace FlightManagement.Scheduler
{
    
    public class DatabaseSynchronizeTask : ScheduledProcessor
    {
        public DatabaseSynchronizeTask(IServiceScopeFactory serviceScopeFactory) : base(serviceScopeFactory)
        {
        }

        protected override string Schedule => "*/1 * * * *";

        public override Task ProcessInScope(IServiceProvider serviceProvider)
        {
            Console.WriteLine("Synchronizing databases...");

            var writeContext = serviceProvider.GetRequiredService<FlightWriteContext>();
            var readContext = serviceProvider.GetRequiredService<FlightReadContext>();

            // readContext.AirlinePlanes.RemoveRange(readContext.AirlinePlanes);
            // readContext.Airlines.RemoveRange(readContext.Airlines);
            // readContext.Flights.RemoveRange(readContext.Flights);
            // readContext.Planes.RemoveRange(readContext.Planes);

            // readContext.AirlinePlanes = writeContext.AirlinePlanes;
            // readContext.Airlines = writeContext.Airlines;
            // readContext.Flights = writeContext.Flights;
            // readContext.Planes = writeContext.Planes;

            readContext.BulkInsertOrUpdateOrDelete(writeContext.AirlinePlanes.ToList(), new BulkConfig { PreserveInsertOrder = true });
            readContext.BulkInsertOrUpdateOrDelete(writeContext.Planes.ToList(), new BulkConfig { PreserveInsertOrder = true });
            readContext.BulkInsertOrUpdateOrDelete(writeContext.Airlines.ToList(), new BulkConfig { PreserveInsertOrder = true });
            readContext.BulkInsertOrUpdateOrDelete(writeContext.AirlinePlanes.ToList(), new BulkConfig { PreserveInsertOrder = true });

            readContext.SaveChanges();

            Console.WriteLine("Finished synchronizing!");

            return Task.CompletedTask;
        }
    }
}