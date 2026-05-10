using EnergyAPI.Middleware;

// [1.1.1]
// Creates the WebApplicationBuilder instance.
// This object bootstraps the ASP.NET Core application.
var builder = WebApplication.CreateBuilder(args);

// [1.1.2]
// Registers controller services into the dependency injection container.
// Controllers handle HTTP endpoint routing.
builder.Services.AddControllers();

// [3.5.1]
// Registers Cross-Origin Resource Sharing policies.
// Allows frontend applications on different origins to access the API.
builder.Services.AddCors(options =>
{
    // [3.5.2]
    // Defines frontend development access policy.
    options.AddPolicy("FrontendPolicy", policy =>
    {
        // [3.5.3]
        // Allows local frontend development server access.
        policy.WithOrigins(
                "http://127.0.0.1:5500",
                "http://localhost:5500"
            )

            // [3.5.4]
            // Allows all HTTP headers.
            .AllowAnyHeader()

            // [3.5.5]
            // Allows all HTTP methods.
            .AllowAnyMethod();
    });
});

// [1.1.3]
// Registers endpoint discovery services required for Swagger/OpenAPI.
builder.Services.AddEndpointsApiExplorer();

// [1.1.4]
// Registers Swagger generation services.
builder.Services.AddSwaggerGen();

// [1.1.5]
// Builds the application pipeline from registered services.
var app = builder.Build();

// [1.1.6]
// Enables Swagger middleware only in development environments.
// Prevents unnecessary API metadata exposure in production.
if (app.Environment.IsDevelopment())
{
    // [1.1.7]
    // Enables Swagger JSON endpoint generation.
    app.UseSwagger();

    // [1.1.8]
    // Enables Swagger UI dashboard.
    app.UseSwaggerUI();
}

// [2.2.13]
// Enables centralized global exception handling middleware.
// Must execute early to capture downstream exceptions.
app.UseMiddleware<GlobalExceptionMiddleware>();

// [2.3.9]
// Enables structured HTTP request and response logging middleware.
app.UseMiddleware<RequestLoggingMiddleware>();

// [3.5.6]
// Enables configured Cross-Origin Resource Sharing policies.
app.UseCors("FrontendPolicy");

// [1.1.9]
// Redirects HTTP requests to HTTPS.
// Temporarily disabled during SSL troubleshooting.

app.UseHttpsRedirection();

// [1.1.10]
// Enables authorization middleware pipeline.
// Authentication systems will be added later.
app.UseAuthorization();

// [2.4.1]
// Root endpoint providing basic API information.
// Useful for uptime checks and service discovery.
app.MapGet("/", () =>
{
    // [2.4.2]
    // Returns a simple service status object.
    return Results.Ok(new
    {
        service = "Das Energie Zentrum API",
        status = "running",
        timestamp = DateTime.UtcNow,
        endpoints = new
        {
            health = "/api/health",
            swagger = "/swagger"
        }
    });
});

// [1.1.11]
// Maps controller endpoints automatically.
app.MapControllers();

// [1.1.12]
// Starts the ASP.NET Core application.
app.Run();