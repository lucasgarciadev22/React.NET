using Activity_1_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Activity_1_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class Act1Controller : ControllerBase
  {
    private int Index { get; set; }
    public IEnumerable<Activity> Activities = new List<Activity>(){
      new Activity(1,"First Activity","My first activity",Priority.Low),
      new Activity(2,"Second Activity","My second activity",Priority.High),
      new Activity(3,"Third Activity","My third activity",Priority.Normal)
    };

    [HttpGet]
    public IEnumerable<Activity> get()
    {
      return Activities;
    }

    [HttpGet("{id}")]
    public Activity getById(int id)
    {
      return Activities.FirstOrDefault(act => act.Id == id);
    }

    [HttpPost]
    public IActionResult post(Activity activity)
    {
      if (Activities.Any(act => act.Id == activity.Id))
      {
        return BadRequest("Thid Id is already registered");
      }
      else
      {

        Activities.Append(activity);
      }
      return CreatedAtAction(nameof(getById), new { Id = activity.Id }, activity);
    }
    [HttpPut]
    public string put()
    {
      return "My fist http put method";
    }

    [HttpDelete]
    public string delete()
    {
      return "My fist http delete method";
    }
  }
}