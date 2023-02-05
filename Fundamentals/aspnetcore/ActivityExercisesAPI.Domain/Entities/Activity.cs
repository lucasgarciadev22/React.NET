namespace ActivityExercisesAPI.Domain.Entities
{
  public class Activity
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Priority Priority { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime? ConclusionDate { get; set; }

    public Activity() => CreationDate = DateTime.Now;//alternative ctor to atribute default date. :this() references 'super' ctor
    public Activity(int id, string title, string description, Priority priority) : this()
    {
      Id = id;
      Title = title;
      Description = description;
      Priority = priority;
    }

    public void SetConclusionDate()
    {
      ConclusionDate = ConclusionDate ?? DateTime.Now;
    }
  }
}