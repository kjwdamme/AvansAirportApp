using Microsoft.EntityFrameworkCore.Migrations;

namespace GateManagement.Migrations
{
    public partial class ForeignKeyFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightCheckInCounters_CheckInCounters_CheckInCounterNumber",
                table: "FlightCheckInCounters");

            migrationBuilder.DropForeignKey(
                name: "FK_FlightGates_Gates_GateNumber",
                table: "FlightGates");

            migrationBuilder.DropColumn(
                name: "GateId",
                table: "FlightGates");

            migrationBuilder.DropColumn(
                name: "CheckInCounterId",
                table: "FlightCheckInCounters");

            migrationBuilder.AlterColumn<string>(
                name: "GateNumber",
                table: "FlightGates",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CheckInCounterNumber",
                table: "FlightCheckInCounters",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightCheckInCounters_CheckInCounters_CheckInCounterNumber",
                table: "FlightCheckInCounters",
                column: "CheckInCounterNumber",
                principalTable: "CheckInCounters",
                principalColumn: "Number",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightGates_Gates_GateNumber",
                table: "FlightGates",
                column: "GateNumber",
                principalTable: "Gates",
                principalColumn: "Number",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightCheckInCounters_CheckInCounters_CheckInCounterNumber",
                table: "FlightCheckInCounters");

            migrationBuilder.DropForeignKey(
                name: "FK_FlightGates_Gates_GateNumber",
                table: "FlightGates");

            migrationBuilder.AlterColumn<string>(
                name: "GateNumber",
                table: "FlightGates",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "GateId",
                table: "FlightGates",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "CheckInCounterNumber",
                table: "FlightCheckInCounters",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "CheckInCounterId",
                table: "FlightCheckInCounters",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightCheckInCounters_CheckInCounters_CheckInCounterNumber",
                table: "FlightCheckInCounters",
                column: "CheckInCounterNumber",
                principalTable: "CheckInCounters",
                principalColumn: "Number",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FlightGates_Gates_GateNumber",
                table: "FlightGates",
                column: "GateNumber",
                principalTable: "Gates",
                principalColumn: "Number",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
