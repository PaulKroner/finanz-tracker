using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToIncome : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b2a9e013-1a2f-4c5d-9f8e-7e6d5c4b3a21");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f728c292-66d1-4d33-bc46-5f8e56d78901");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Incomes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_AppUserId",
                table: "Incomes",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Incomes_AspNetUsers_AppUserId",
                table: "Incomes",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Incomes_AspNetUsers_AppUserId",
                table: "Incomes");

            migrationBuilder.DropIndex(
                name: "IX_Incomes_AppUserId",
                table: "Incomes");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Incomes");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b2a9e013-1a2f-4c5d-9f8e-7e6d5c4b3a21", null, "User", "USER" },
                    { "f728c292-66d1-4d33-bc46-5f8e56d78901", null, "Admin", "ADMIN" }
                });
        }
    }
}
