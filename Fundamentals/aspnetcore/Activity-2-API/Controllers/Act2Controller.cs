using ActivityExercisesAPI.Domain.Entities;
using ActivityExercisesAPI.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Activity_2_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class Act2Controller : ControllerBase
  {
    private readonly IActivityService _activityService;
    public Act2Controller(IActivityService activityService)
    {
      _activityService = activityService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      try
      {
        var activities = await _activityService.GetAllActivitiesAsync();
        if (activities == null) return NoContent();

        return Ok(activities);
      }
      catch (System.Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
        $"Error while trying to return Activities. Error: {ex.Message}");
      }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      try
      {
        var activity = await _activityService.GetActivityByIdAsync(id);
        if (activity == null) return NoContent();

        return Ok(activity);
      }
      catch (System.Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
        $"Error while trying to return Activity {id}. Error: {ex.Message}");
      }
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync(Activity activity)
    {
      try
      {
        var activityToPost = await _activityService.AddActivity(activity);
        if (activityToPost == null) return NoContent();

        return Ok(activityToPost);
      }
      catch (System.Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
        $"Error while trying to add Activity {activity.Id}. Error: {ex.Message}");
      }
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Activity activity)
    {
      try
      {
        var activityToPut = await _activityService.GetActivityByIdAsync(id);
        if (activityToPut.Id != id) return NotFound($"No activity with Id:{id} was found");

        activityToPut = await _activityService.UpdateActivity(activity);
        return Ok(activityToPut);
      }
      catch (System.Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
        $"Error while trying to update Activity {id}. Error: {ex.Message}");
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
      try
      {
        var activityToDelete = await _activityService.GetActivityByIdAsync(id);
        if (activityToDelete == null) return this.StatusCode(StatusCodes.Status409Conflict,
        "Unable to delete the specified activity");

        if (await _activityService.DeleteActivity(id))
        {
          return Ok(new { message = $"Activity {id} successfully removed" });
        }
        else
        {
          return BadRequest("Could not delete the specified activity");
        }
      }
      catch (System.Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
        $"Error while trying to update Activity {id}. Error: {ex.Message}");
      }
    }
  }
}