// [2.1.1]
// Standard API response wrapper used across the entire system.
// Ensures consistent frontend integration and predictable API structure.

namespace EnergyAPI.Core.Responses;

public class ApiResponse<T>
{
    // [2.1.2]
    // Indicates whether the request was successful.
    public bool Success { get; set; }

    // [2.1.3]
    // Human-readable message for debugging or UI display.
    public string Message { get; set; } = string.Empty;

    // [2.1.4]
    // Actual payload returned by the API.
    public T? Data { get; set; }

    // [2.1.5]
    // Server timestamp for tracking and debugging.
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    // [2.1.6]
    // Factory method for success responses.
    public static ApiResponse<T> Ok(T data, string message = "Success")
    {
        return new ApiResponse<T>
        {
            Success = true,
            Message = message,
            Data = data,
            Timestamp = DateTime.UtcNow
        };
    }

    // [2.1.7]
    // Factory method for error responses.
    public static ApiResponse<T> Fail(string message)
    {
        return new ApiResponse<T>
        {
            Success = false,
            Message = message,
            Data = default,
            Timestamp = DateTime.UtcNow
        };
    }
}