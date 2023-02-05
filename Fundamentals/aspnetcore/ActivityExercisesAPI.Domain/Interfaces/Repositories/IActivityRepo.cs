using ActivityExercisesAPI.Domain.Entities;

namespace ActivityExercisesAPI.Domain.Interfaces.Repositories
{
  public interface IActivityRepo : IGeneralRepo
  {
    Task<Activity[]> GetActivitiesAsync();
    Task<Activity> GetByIdAsync(int id );
    Task<Activity> GetByTitleAsync(string title);


  }
}