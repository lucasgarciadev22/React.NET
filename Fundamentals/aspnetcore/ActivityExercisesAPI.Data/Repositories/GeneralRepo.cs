using ActivityExercisesAPI.Data.Context;
using ActivityExercisesAPI.Domain.Interfaces.Repositories;

namespace ActivityExercisesAPI.Data.Repositories
{
  public class GeneralRepo : IGeneralRepo
  {
    private readonly DataContext _context;
    public GeneralRepo(DataContext context)
    {
      _context = context;

    }
    public void Add<T>(T entity) where T : class
    {
      _context.Add(entity);
    }
    public void Update<T>(T entity) where T : class
    {
      _context.Update(entity);
    }
    public void Delete<T>(T entity) where T : class
    {
      _context.Remove(entity);
    }

    public void DeleteMany<T>(T[] entities) where T : class
    {
      _context.RemoveRange(entities);
    }

    public async Task<bool> SaveChangesAsync()
    {
      return (await _context.SaveChangesAsync()) > 0;
    }
  }
}