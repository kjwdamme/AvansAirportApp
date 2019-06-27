using Microsoft.EntityFrameworkCore.Migrations;

namespace GateManagement.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "CheckInCounters",
                columns: new[] { "Number", "BaggageDropOffPoint" },
                values: new object[,]
                {
                    { "1", true },
                    { "2", true }
                });

            migrationBuilder.InsertData(
                table: "Gates",
                column: "Number",
                values: new object[]
                {
                    "A1",
                    "A2",
                    "B1",
                    "B2"
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CheckInCounters",
                keyColumn: "Number",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "CheckInCounters",
                keyColumn: "Number",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "Gates",
                keyColumn: "Number",
                keyValue: "A1");

            migrationBuilder.DeleteData(
                table: "Gates",
                keyColumn: "Number",
                keyValue: "A2");

            migrationBuilder.DeleteData(
                table: "Gates",
                keyColumn: "Number",
                keyValue: "B1");

            migrationBuilder.DeleteData(
                table: "Gates",
                keyColumn: "Number",
                keyValue: "B2");
        }
    }
}
