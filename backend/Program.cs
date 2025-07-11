using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

Env.Load();
string connectionString =
    $"Host={Env.GetString("PGHOST")};" +
    $"Port ={Env.GetString("PGPORT")};" +
    $"Database={Env.GetString("PGDATABASE")};" +
    $"Username ={Env.GetString("PGUSER")};" +
    $"Password={Env.GetString("PGPASSWORD")}";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Controller aktivieren
builder.Services.AddControllers();

var app = builder.Build();

// Routing aktivieren
app.MapControllers();

app.MapGet("/", () => "Hello World!");

app.Run();
