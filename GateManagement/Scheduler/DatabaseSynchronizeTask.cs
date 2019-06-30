using System;
using System.Linq;
using System.Threading.Tasks;
using EFCore.BulkExtensions;
using GateManagement.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace GateManagement.Scheduler
{
    
    public class DatabaseSynchronizeTask : ScheduledProcessor
    {
        public DatabaseSynchronizeTask(IServiceScopeFactory serviceScopeFactory) : base(serviceScopeFactory)
        {
        }

        protected override string Schedule => "*/1 * * * *";

        public override Task ProcessInScope(IServiceProvider serviceProvider)
        {
            Console.WriteLine("Synchronizing gate databases...");

            var writeContext = serviceProvider.GetRequiredService<GateWriteContext>();
            var readContext = serviceProvider.GetRequiredService<GateReadContext>();
            
            readContext.BulkInsertOrUpdate(writeContext.Gates.ToList(), 
                new BulkConfig { PreserveInsertOrder = true });
            readContext.BulkInsertOrUpdate(writeContext.CheckInCounters.ToList(), 
                new BulkConfig { PreserveInsertOrder = true });
            readContext.BulkInsertOrUpdate(writeContext.FlightCheckInCounters.ToList(), 
                new BulkConfig { PreserveInsertOrder = true });
            readContext.BulkInsertOrUpdate(writeContext.FlightGates.ToList(),
                new BulkConfig {PreserveInsertOrder = true});
            readContext.SaveChanges();

            Console.WriteLine("Finished synchronizing gate databases!");

            return Task.CompletedTask;
        }
    }
}