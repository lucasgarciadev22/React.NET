namespace ActivityExercisesAPI.Domain.Interfaces.Repositories
{
  public interface IGeneralRepo
  {
    void Add<T>(T entity) where T : class;
    void Update<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    void DeleteMany<T>(T[] entities) where T : class;
    Task<bool> SaveChangesAsync();
  }
}