using GateManagement.Entities;
using GateManagement.Repositories;
using GateManagement.Scheduler;
using GateManagement.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace GateManagement
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

            var host = Configuration["DBHOST"] ?? "sqldatabase";
            var port = Configuration["DBPORT"] ?? "1433";
            var user = Configuration["DBUSER"] ?? "sa";
            var password = Configuration["DBPASSWORD"] ?? "Atleast8characters!";

            services.AddDbContext<GateWriteContext>
                (options => options.UseSqlServer($"Server={host},{port};User={user};Password={password};Database=GateWriteDatabase;Trusted_Connection=False;"));

            services.AddDbContext<GateReadContext>
                (options => options.UseSqlServer($"Server={host},{port};User={user};Password={password};Database=GateReadDatabase;Trusted_Connection=False;"));

            services.AddTransient<GateRepository>();
            services.AddTransient<CheckInCounterRepository>();
            services.AddSingleton<IHostedService, DatabaseSynchronizeTask>();
            services.AddHostedService<GateQueueHostedService>();
            services.AddHostedService<CheckInCounterQueueHostedService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();

            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetService<GateWriteContext>().MigrateDb();
                scope.ServiceProvider.GetService<GateReadContext>().MigrateDb();
            }    
        }
    }
}
