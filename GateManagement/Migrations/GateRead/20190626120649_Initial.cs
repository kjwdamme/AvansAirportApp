using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GateManagement.Migrations.GateRead
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CheckInCounters",
                columns: table => new
                {
                    Number = table.Column<string>(nullable: false),
                    BaggageDropOffPoint = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckInCounters", x => x.Number);
                });

            migrationBuilder.CreateTable(
                name: "Gates",
                columns: table => new
                {
                    Number = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gates", x => x.Number);
                });

            migrationBuilder.CreateTable(
                name: "FlightCheckInCounters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FlightId = table.Column<int>(nullable: false),
                    OpeningTime = table.Column<DateTime>(nullable: false),
                    ClosingTime = table.Column<DateTime>(nullable: false),
                    CheckInCounterNumber = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightCheckInCounters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlightCheckInCounters_CheckInCounters_CheckInCounterNumber",
                        column: x => x.CheckInCounterNumber,
                        principalTable: "CheckInCounters",
                        principalColumn: "Number",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FlightGates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FlightId = table.Column<int>(nullable: false),
                    OpeningTime = table.Column<DateTime>(nullable: false),
                    ClosingTime = table.Column<DateTime>(nullable: false),
                    GateNumber = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightGates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlightGates_Gates_GateNumber",
                        column: x => x.GateNumber,
                        principalTable: "Gates",
                        principalColumn: "Number",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightCheckInCounters_CheckInCounterNumber",
                table: "FlightCheckInCounters",
                column: "CheckInCounterNumber");

            migrationBuilder.CreateIndex(
                name: "IX_FlightGates_GateNumber",
                table: "FlightGates",
                column: "GateNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightCheckInCounters");

            migrationBuilder.DropTable(
                name: "FlightGates");

            migrationBuilder.DropTable(
                name: "CheckInCounters");

            migrationBuilder.DropTable(
                name: "Gates");
        }
    }
}
