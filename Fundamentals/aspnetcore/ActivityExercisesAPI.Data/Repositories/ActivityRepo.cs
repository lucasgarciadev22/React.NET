using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ActivityExercisesAPI.Domain.Entities;
using ActivityExercisesAPI.Domain.Interfaces.Repositories;

namespace ActivityExercisesAPI.Data.Repositories
{
  public class ActivityRepo : IActivityRepo
  {
    public void Add<T>(T entity) where T : class
    {
      throw new NotImplementedException();
    }

    public void Delete<T>(T entity) where T : class
    {
      throw new NotImplementedException();
    }

    public void DeleteMany<T>(T[] entity) where T : class
    {
      throw new NotImplementedException();
    }

    public Task<Activity[]> GetActivitiesAsync()
    {
      throw new NotImplementedException();
    }

    public Task<Activity> GetByIdAsync(int id)
    {
      throw new NotImplementedException();
    }

    public Task<Activity> GetByTitleAsync(string title)
    {
      throw new NotImplementedException();
    }

    public Task<bool> SaveChangesAsync()
    {
      throw new NotImplementedException();
    }

    public void Update<T>(T entity) where T : class
    {
      throw new NotImplementedException();
    }
  }
}