using ActivityExercisesAPI.Data.Context;
using ActivityExercisesAPI.Domain.Entities;
using ActivityExercisesAPI.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ActivityExercisesAPI.Data.Repositories
{
  public class ActivityRepo : GeneralRepo, IActivityRepo
  {
    private readonly DataContext _context;
    public ActivityRepo(DataContext context) : base(context)
    {
      _context = context;
    }

    public async Task<Activity[]> GetActivitiesAsync()
    {
      IQueryable<Activity> queryActivities = _context.Activities;
      queryActivities.AsNoTracking().OrderBy(act => act.Id);

      return await queryActivities.ToArrayAsync();
    }

    public async Task<Activity> GetByIdAsync(int id)
    {
      IQueryable<Activity> queryActivities = _context.Activities;
      queryActivities = queryActivities.AsNoTracking().OrderBy(act => act.Id).Where(act => act.Id == id);

      return await queryActivities.FirstOrDefaultAsync(act => act.Id == id);
    }

    public async Task<Activity> GetByTitleAsync(string title)
    {
      IQueryable<Activity> queryActivities = _context.Activities;
      queryActivities = queryActivities.AsNoTracking().OrderBy(act => act.Title).Where(act => act.Title == title);

      return await queryActivities.FirstOrDefaultAsync(act => act.Title == title);
    }
  }
}