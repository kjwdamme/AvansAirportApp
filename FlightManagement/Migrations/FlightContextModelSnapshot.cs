﻿// <auto-generated />
using System;
using FlightManagement.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FlightManagement.Migrations
{
    [DbContext(typeof(FlightContext))]
    partial class FlightContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FlightManagement.Entities.Airline", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Airlines");
                });

            modelBuilder.Entity("FlightManagement.Entities.AirlinePlane", b =>
                {
                    b.Property<int>("AirlinePlaneId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AirlineId");

                    b.Property<int>("Amount");

                    b.Property<int>("PlaneId");

                    b.HasKey("AirlinePlaneId");

                    b.HasIndex("AirlineId");

                    b.HasIndex("PlaneId");

                    b.ToTable("AirlinePlanes");
                });

            modelBuilder.Entity("FlightManagement.Entities.Flight", b =>
                {
                    b.Property<int>("FlightId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AirlineId");

                    b.Property<DateTime>("ArrivalDate");

                    b.Property<int>("DelayMinutes");

                    b.Property<DateTime>("DepartureDate");

                    b.Property<string>("Destination")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<int>("DurationMinutes");

                    b.Property<bool>("IsArriving");

                    b.Property<int>("PlaneId");

                    b.HasKey("FlightId");

                    b.HasIndex("AirlineId");

                    b.HasIndex("PlaneId");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("FlightManagement.Entities.Plane", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("MaxBaggageWeight");

                    b.Property<int>("MaxPassengers");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Planes");
                });

            modelBuilder.Entity("FlightManagement.Entities.AirlinePlane", b =>
                {
                    b.HasOne("FlightManagement.Entities.Airline", "Airline")
                        .WithMany("AirlinePlanes")
                        .HasForeignKey("AirlineId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FlightManagement.Entities.Plane", "Plane")
                        .WithMany("AirlinePlanes")
                        .HasForeignKey("PlaneId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FlightManagement.Entities.Flight", b =>
                {
                    b.HasOne("FlightManagement.Entities.Airline", "Airline")
                        .WithMany("Flights")
                        .HasForeignKey("AirlineId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FlightManagement.Entities.Plane", "Plane")
                        .WithMany()
                        .HasForeignKey("PlaneId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
