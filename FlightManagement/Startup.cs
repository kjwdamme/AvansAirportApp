using FlightManagement.Controllers;
using FlightManagement.Entities;
using FlightManagement.Repositories;
using FlightManagement.Scheduler;
using FlightManagement.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FlightManagement
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // string writeConnection = @"Server=(localdb)\mssqllocaldb;Database=FlightWriteDatabase;Trusted_Connection=True;ConnectRetryCount=0";

            var host = Configuration["DBHOST"] ?? "localhost";
            var port = Configuration["DBPORT"] ?? "1433";
            var user = Configuration["DBUSER"] ?? "sa";
            var password = Configuration["DBPASSWORD"] ?? "Atleast8characters!";

            services.AddDbContext<FlightWriteContext>
                (options => options.UseSqlServer($"Server={host},{port};User={user};Password={password};Database=FlightWriteDatabase;Trusted_Connection=False;"));

            services.AddDbContext<FlightReadContext>
                (options => options.UseSqlServer($"Server={host},{port};User={user};Password={password};Database=FlightReadDatabase;Trusted_Connection=False;"));

            services.AddHttpClient<FlightController>();

            services.AddTransient<AirlineRepository>();
            services.AddTransient<FlightRepository>();
            services.AddTransient<QueueService>();
            services.AddSingleton<IHostedService, DatabaseSynchronizeTask>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();

                        // auto migrate db
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetService<FlightWriteContext>().MigrateDB();
                scope.ServiceProvider.GetService<FlightReadContext>().MigrateDB();
            }    
        }
    }
}
