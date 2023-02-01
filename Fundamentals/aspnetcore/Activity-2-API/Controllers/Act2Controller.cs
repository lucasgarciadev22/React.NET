
using Activity_2_API.Models;
using ActivityExercisesAPI.Data.Context;
using Microsoft.AspNetCore.Mvc;

namespace Activity_2_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class Act2Controller : ControllerBase
  {
    private int Index { get; set; }
    // public IEnumerable<Activity> Activities = new List<Activity>(){
    //   new Activity(1,"First Activity","My first activity",Priority.Low),
    //   new Activity(2,"Second Activity","My second activity",Priority.High),
    //   new Activity(3,"Third Activity","My third activity",Priority.Normal)
    // };
    private readonly DataContext _context;

    public Act2Controller(DataContext context)
    {
      _context = context;
    }

    [HttpGet]
    public IEnumerable<Activity> Get()
    {
      return _context.Activities;
    }

    [HttpGet("{id}")]
    public Activity GetById(int id)
    {
      return _context.Activities.FirstOrDefault(act => act.Id == id);
    }

    [HttpPost]
    public IEnumerable<Activity> Post(Activity activity)
    {
      _context.Activities.Add(activity);

      if (_context.SaveChanges() > 0)//if result >0 return all
      {
        return _context.Activities;
      }
      else
      {
        throw new Exception("Unable to add new activity to Database...");
      }
    }
    [HttpPut("{id}")]
    public Activity Put(int id, Activity activity)
    {
      if (activity.Id != id) throw new Exception("Activities Ids doesn't match...");

      _context.Update(activity);
      if (_context.SaveChanges() > 0)
      {
        return _context.Activities.FirstOrDefault(act => act.Id == id);
      }
      return new Activity(activity.Id, activity.Title, activity.Description, activity.Priority);//if not registered create new activity
    }

    [HttpDelete("{id}")]
    public bool Delete(int id)
    {
      var activityToDelete = _context.Activities.FirstOrDefault(act => act.Id == id);
      if (activityToDelete == null) throw new Exception("Couldn't find activity in Database...");
      _context.Remove(activityToDelete);
      return _context.SaveChanges() > 0;//return if its true that changes were done
    }
  }
}