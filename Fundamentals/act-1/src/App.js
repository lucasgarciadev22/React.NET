import { useState } from "react";
import "./App.css";

//create container with activities (initial values)
const priorities = { 0: "Low", 1: "Normal", 2: "High" }; //enum
const prioritiesColor = { Low: "badge bg-success", Normal: "badge bg-warning text-dark ", High: "badge bg-danger" };
let initialContainerState = [
  {
    id: 1,
    description: "First Activity",
    priority: priorities[0],
  },
  {
    id: 2,
    description: "Second Activity",
    priority: priorities[1],
  },
];

//start app here with all the functions and elements to be rendered by react
function App() {
  //declare activities array and pass initialstate
  const [activities, setActivities] = useState(initialContainerState);
  const [priorityDisplay, changePriorityDisplay] = useState(priorities[0]);
  //add activity to the lists
  function addActivity(event) {
    event.preventDefault();
    const activity = {
      id: document.getElementById("id").value,
      description: document.getElementById("desc").value,
      priority: priorityDisplay,
    };

    activities.push(activity);
    setActivities([...activities]);
    //or removing push and settingo a new obj with spread operator -> setActivities([...activities], {...activity})
  }
  //change priority slider handler
  const setPriority = (event) => {
    changePriorityDisplay(priorities[event.target.value]);
  };
  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label for="inputEmail4">Id</label>
          <input
            id="id"
            type="text"
            placeholder="Inform the activity id"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label for="inputEmail4">Description</label>
          <input
            id="desc"
            type="text"
            placeholder="Describe your activity"
            className="form-control"
          />
          <div className="col-md-6" style={{ margin: "16px" }}>
            <label for="inputEmail4">Priority - {priorityDisplay}  </label>
            <input
              type="range"
              class="custom-range"
              min="0"
              max="2"
              step="1"
              id="priority-range"
              onChange={setPriority}
            ></input>
            {/* selector alternative to set priority level 
            <select id="set-priority">
              <option value={priorities.Low}>Low</option>
              <option value={priorities.Normal}>Normal</option>
              <option value={priorities.High}>High</option>
            </select> */}
          </div>
        </div>
        <hr />
        <div className="col-12">
          <button className="btn btn-outline-success" onClick={addActivity}>
            + Activity
          </button>
        </div>
        <h1>List:</h1>
      </form>
      {/* generate container list and cards */}
      <div className="mt-3">
        <ul className="list-group">
          {activities.map((act) => (
            <li key={act.id} className="list-group-item">
              {act.id}. {act.description} - Priority: {act.priority}
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <h1>Cards:</h1>
      <div className="mt-3">
        {activities.map((act) => (
          <div
            class="card shadow-sm"
            style={{ width: "18rem", margin: "16px" }}
          >
            <div class="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">
                  <span className="badge rounded-pill bg-secondary">
                    {act.id}</span>  - Title</h5>
                <span className={prioritiesColor[act.priority]} style={{ padding: '8px', margin: '8px' }}>
                  Priority: {act.priority}</span>
              </div>
              <p class="card-text">
                {act.id} - {act.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
