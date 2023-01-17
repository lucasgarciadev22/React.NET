import "./App.css";

function App() {
  const activities = [
    {
      id: 1,
      description: "First Activity",
    },
    {
      id: 2,
      description: "Second Activity",
    },
  ];

  return (
    (
      <div className="mt-3">
        <ul class="list-group">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
          <li class="list-group-item">A fourth item</li>
          <li class="list-group-item">And a fifth one</li>
        </ul>
      </div>
    ),
    (
      <div className="mt-3">
        <ul className="list-group">
          {activities.map((act) => (
            <li key={act.id} className="list-group-item">
              {act.id}. {act.description}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default App;
