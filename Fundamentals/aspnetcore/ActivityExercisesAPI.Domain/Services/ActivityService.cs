using ActivityExercisesAPI.Domain.Entities;
using ActivityExercisesAPI.Domain.Interfaces.Repositories;
using ActivityExercisesAPI.Domain.Interfaces.Services;

namespace ActivityExercisesAPI.Domain.Services
{
  public class ActivityService : IActivityService
  {
    private readonly IActivityRepo _activityRepo;
    public ActivityService(IActivityRepo activityRepo)
    {
      _activityRepo = activityRepo;
    }
    public async Task<Activity> AddActivity(Activity model)
    {
      if (await _activityRepo.GetByTitleAsync(model.Title) != null)
      {
        throw new Exception("Another activity with the same title already exists...");
      }
      if (await _activityRepo.GetByIdAsync(model.Id) == null)
      {
        _activityRepo.Add(model);
        if (await _activityRepo.SaveChangesAsync())
        {
          return model;
        }
      }
      return null;
    }
    public async Task<Activity> UpdateActivity(Activity model)
    {
      if (model.ConclusionDate != null)
      {
        throw new Exception("You can't change a concluded activity...");
      }
      if (await _activityRepo.GetByIdAsync(model.Id) == null)
      {
        _activityRepo.Update(model);
        if (await _activityRepo.SaveChangesAsync())
        {
          return model;
        }
      }
      return null;
    }
    public async Task<bool> ConcludeActivity(Activity model)
    {
      if (model != null)
      {
        model.SetConclusionDate();
        _activityRepo.Update<Activity>(model);
        return await _activityRepo.SaveChangesAsync();
      }
      return false;
    }

    public async Task<bool> DeleteActivity(int id)
    {
      var activity = await _activityRepo.GetByIdAsync(id);
      if (activity == null)
      {
        throw new Exception("Activity not found, unable to delete activity...");
      }
      _activityRepo.Delete<Activity>(activity);
      return await _activityRepo.SaveChangesAsync();
    }
    public async Task<Activity> GetActivityByIdAsync(int id)
    {
      try
      {
        var activity = await _activityRepo.GetByIdAsync(id);
        if (activity == null) return null;
        {
          return activity;
        }
      }
      catch (System.Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<Activity[]> GetAllActivitiesAsync()
    {
      try
      {
        var activities = await _activityRepo.GetActivitiesAsync();
        if (activities == null) return null;
        {
          return activities;
        }
      }
      catch (System.Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }
  }
}