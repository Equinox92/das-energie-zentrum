namespace EnergyAPI.Middleware;

// [2.3.1]
// Middleware responsible for logging incoming HTTP requests
// and outgoing HTTP responses for diagnostics and monitoring.
public class RequestLoggingMiddleware
{
    // [2.3.2]
    // Stores reference to the next middleware component.
    private readonly RequestDelegate _next;

    // [2.3.3]
    // Stores logger instance for structured request logging.
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    // [2.3.4]
    // Middleware constructor receives pipeline dependencies.
    public RequestLoggingMiddleware(
        RequestDelegate next,
        ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    // [2.3.5]
    // Executes middleware logic during each HTTP request.
    public async Task InvokeAsync(HttpContext context)
    {
        // [2.3.6]
        // Logs incoming HTTP request details.
        _logger.LogInformation(
            "Incoming Request: {Method} {Path}",
            context.Request.Method,
            context.Request.Path);

             // [2.3.9]
    // Temporary console verification for middleware execution learning.
   // Console.WriteLine("RequestLoggingMiddleware triggered.");

        // [2.3.7]
        // Passes execution to the next middleware component.
        await _next(context);

        // [2.3.8]
        // Logs outgoing HTTP response status code.
        _logger.LogInformation(
            "Outgoing Response: {StatusCode}",
            context.Response.StatusCode);
    }
}
