using System.Net;
using System.Text.Json;
using EnergyAPI.Core.Responses;

namespace EnergyAPI.Middleware;

// [2.2.1]
// Global middleware responsible for centralized exception handling.
// Prevents unhandled server crashes from exposing sensitive details.
public class GlobalExceptionMiddleware
{
    // [2.2.2]
    // Stores reference to the next middleware in the pipeline.
    private readonly RequestDelegate _next;

    // [2.2.3]
    // Stores logger instance for structured exception logging.
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    // [2.2.4]
    // Middleware constructor receives pipeline dependencies.
    public GlobalExceptionMiddleware(
        RequestDelegate next,
        ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    // [2.2.5]
    // Executes middleware logic during each HTTP request.
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            // [2.2.6]
            // Passes execution to the next middleware component.
            await _next(context);
        }
        catch (Exception exception)
        {
            // [2.2.7]
            // Logs unexpected exceptions for diagnostics.
            _logger.LogError(exception,
                "Unhandled exception occurred.");

            // [2.2.8]
            // Executes centralized exception response handling.
            await HandleExceptionAsync(context);
        }
    }

    // [2.2.9]
    // Builds standardized API error response.
    private static async Task HandleExceptionAsync(
        HttpContext context)
    {
        // [2.2.10]
        // Sets response content type to JSON.
        context.Response.ContentType = "application/json";

        // [2.2.11]
        // Returns HTTP 500 Internal Server Error status code.
        context.Response.StatusCode =
            (int)HttpStatusCode.InternalServerError;

        // [2.2.12]
        // Creates safe standardized error payload.
        var response = ApiResponse<string>.Fail(
            "An unexpected server error occurred.");

        // [2.2.13]
        // Serializes response object into JSON.
        var jsonResponse =
            JsonSerializer.Serialize(response);

        // [2.2.14]
        // Writes JSON response to HTTP output stream.
        await context.Response.WriteAsync(jsonResponse);
    }
}