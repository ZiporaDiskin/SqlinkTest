

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RateLimitingDemo.Middleware.RateLimiting;
using System.Text;
using Test;
using Test.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
   .AddJwtBearer("Bearer", options =>
   {
       options.RequireHttpsMetadata = false;
       options.SaveToken = true;
       options.TokenValidationParameters = new TokenValidationParameters
       {
           //ValidateIssuerSigningKey = jwtSettings.ValidateIssuerSigningKey,
           //IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.IssuerSigningKey)),
           //ValidateIssuer = jwtSettings.ValidateIssuer,
           //ValidIssuer = jwtSettings.ValidIssuer,
           //ValidateAudience = jwtSettings.ValidateAudience,
           //ValidAudience = jwtSettings.ValidAudience,
           //RequireExpirationTime = jwtSettings.RequireExpirationTime,
           //ValidateLifetime = jwtSettings.RequireExpirationTime,
           //ClockSkew = TimeSpan.FromDays(1),

           ValidateIssuer = true,
           ValidateAudience = true,
           ValidateLifetime = true,
           ValidateIssuerSigningKey = true,
           ValidIssuer = builder.Configuration["Jwt:Issuer"],
           ValidAudience = builder.Configuration["Jwt:Issuer"],
           IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
       };
   });

builder.Services.AddDbContext<CompanyContext>(options =>
                      options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Add Rate Limiting
builder.Services.AddRateLimiting(builder.Configuration);
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x.AllowAnyMethod()
                  .AllowAnyHeader()
                  .SetIsOriginAllowed(origin => true) // allow any origin
                  .AllowCredentials());
// Use Rate Limiting
//app.UseRateLimiting();
app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();



app.Run();
