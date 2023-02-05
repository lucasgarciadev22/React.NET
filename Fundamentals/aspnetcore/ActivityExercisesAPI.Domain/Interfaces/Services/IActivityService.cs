using ActivityExercisesAPI.Domain.Entities;

namespace ActivityExercisesAPI.Domain.Interfaces.Services
{
  public interface IActivityService
  {
    Task<Activity> AddActivity(Activity model);
    Task<Activity> UpdateActivity(Activity model);
    Task<Activity[]> GetAllActivitiesAsync();
    Task<Activity> GetActivityByIdAsync(int id);
    Task<bool> DeleteActivity(int id);
    Task<bool> ConcludeActivity(Activity model);
  }
}