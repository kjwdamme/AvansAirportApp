﻿// <auto-generated />
using System;
using GateManagement.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GateManagement.Migrations
{
    [DbContext(typeof(GateWriteContext))]
    [Migration("20190623113503_SeedData")]
    partial class SeedData
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GateManagement.Entities.CheckInCounter", b =>
                {
                    b.Property<string>("Number")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("BaggageDropOffPoint");

                    b.HasKey("Number");

                    b.ToTable("CheckInCounters");

                    b.HasData(
                        new
                        {
                            Number = "1",
                            BaggageDropOffPoint = true
                        },
                        new
                        {
                            Number = "2",
                            BaggageDropOffPoint = true
                        });
                });

            modelBuilder.Entity("GateManagement.Entities.FlightCheckInCounter", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CheckInCounterId");

                    b.Property<string>("CheckInCounterNumber");

                    b.Property<DateTime>("ClosingTime");

                    b.Property<int>("FlightId");

                    b.Property<DateTime>("OpeningTime");

                    b.HasKey("Id");

                    b.HasIndex("CheckInCounterNumber");

                    b.ToTable("FlightCheckInCounters");
                });

            modelBuilder.Entity("GateManagement.Entities.FlightGate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("ClosingTime");

                    b.Property<int>("FlightId");

                    b.Property<int>("GateId");

                    b.Property<string>("GateNumber");

                    b.Property<DateTime>("OpeningTime");

                    b.HasKey("Id");

                    b.HasIndex("GateNumber");

                    b.ToTable("FlightGates");
                });

            modelBuilder.Entity("GateManagement.Entities.Gate", b =>
                {
                    b.Property<string>("Number")
                        .ValueGeneratedOnAdd();

                    b.HasKey("Number");

                    b.ToTable("Gates");

                    b.HasData(
                        new
                        {
                            Number = "A1"
                        },
                        new
                        {
                            Number = "A2"
                        },
                        new
                        {
                            Number = "B1"
                        },
                        new
                        {
                            Number = "B2"
                        });
                });

            modelBuilder.Entity("GateManagement.Entities.FlightCheckInCounter", b =>
                {
                    b.HasOne("GateManagement.Entities.CheckInCounter", "CheckInCounter")
                        .WithMany("FlightCheckInCounters")
                        .HasForeignKey("CheckInCounterNumber");
                });

            modelBuilder.Entity("GateManagement.Entities.FlightGate", b =>
                {
                    b.HasOne("GateManagement.Entities.Gate", "Gate")
                        .WithMany("FlightGates")
                        .HasForeignKey("GateNumber");
                });
#pragma warning restore 612, 618
        }
    }
}
