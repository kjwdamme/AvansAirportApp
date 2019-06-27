using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightManagement.Migrations
{
    public partial class RemovedArriving : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArrivalDate",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "IsArriving",
                table: "Flights");

            migrationBuilder.AddColumn<double>(
                name: "Cost",
                table: "Flights",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Flights");

            migrationBuilder.AddColumn<DateTime>(
                name: "ArrivalDate",
                table: "Flights",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsArriving",
                table: "Flights",
                nullable: false,
                defaultValue: false);
        }
    }
}
