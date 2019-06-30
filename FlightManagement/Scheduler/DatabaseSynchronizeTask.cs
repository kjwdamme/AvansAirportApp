using System;
using System.Linq;
using System.Threading.Tasks;
using EFCore.BulkExtensions;
using FlightManagement.Entities;
using Microsoft.EntityFrameworkCore;
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
            
            readContext.BulkInsertOrUpdate(writeContext.Planes.ToList(), 
                new BulkConfig { PreserveInsertOrder = true });
            readContext.BulkInsertOrUpdate(writeContext.Airlines.ToList(), 
                new BulkConfig { PreserveInsertOrder = true });
            readContext.BulkInsertOrUpdate(writeContext.Flights.ToList(), 
                new BulkConfig { PreserveInsertOrder = true });
            readContext.BulkInsertOrUpdate(writeContext.AirlinePlanes.ToList(),
                new BulkConfig {PreserveInsertOrder = true});
            readContext.SaveChanges();

            Console.WriteLine("Finished synchronizing!");

            return Task.CompletedTask;
        }
    }
}