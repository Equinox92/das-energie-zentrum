//This was replaced with production grade controller
//using Microsoft.AspNetCore.Mvc;

//namespace EnergyAPI.Controllers;

// [2.1.1]
// This controller provides system health status for monitoring and debugging.
//[ApiController]
//[Route("api/[controller]")]
//public class HealthController : ControllerBase
//{
    // [2.1.2]
    // Simple endpoint to confirm API is running correctly.
  //  [HttpGet]
    //public IActionResult Get()
    //{
        // [2.1.3]
        // Returns structured health response.
        //return Ok(new
      //  {
          //  status = "healthy",
            //timestamp = DateTime.UtcNow,
            //service = "Das Energie Zentrum API"
        // });
    // }
// }

using Microsoft.AspNetCore.Mvc;
using EnergyAPI.Core.Responses;

namespace EnergyAPI.Controllers;

// [2.1.1]
// HealthController provides system status using standardized API response format.
[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    // [2.1.2]
    // Returns system health in enterprise response format.
    [HttpGet]
    public IActionResult Get()
    {
        var result = new
        {
            status = "healthy",
            service = "Das Energie Zentrum API"
        };

        // [2.1.3]
        // Wraps response in standardized API contract.
        return Ok(ApiResponse<object>.Ok(result, "System is operational"));
    }
}