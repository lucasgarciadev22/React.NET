import { useState } from "react";
import "./App.css";

//create container with activities (initial values)
const priorities = { 0: "Low", 1: "Normal", 2: "High" }; //enum
const prioritiesBadgeColor = {
  Low: "badge bg-success",
  Normal: "badge bg-warning text-dark ",
  High: "badge bg-danger",
};
const prioritiesBorderColor = {
  Low: "card mb-2 shadow-sm border-success",
  Normal: "card mb-2 shadow-sm border-warning",
  High: "card mb-2 shadow-sm border-danger",
};
const prioritiesIcon = {
  Low: "ms-1 fa-regular fa-face-smile-beam",
  Normal: "ms-1 fa-regular fa-face-meh",
  High: "ms-1 fa-regular fa-face-frown",
};
let initialContainerState = [
  {
    id: 1,
    description: "First Activity",
    priority: priorities[0],
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
  //delete activity from the list
  function deleteActivity(id) {
    const filteredActivities = activities.filter(
      (activity) => activity.id !== id
    ); //remove id from original list
    setActivities([...filteredActivities]);
  }
  //change priority slider handler
  const setPriority = (event) => {
    changePriorityDisplay(priorities[event.target.value]);
  };
  return (
    <>
      <form className="row g-3">
        <div className="col-md-1">
          <label htmlFor="inputEmail4">Id</label>
          <input
            id="id"
            type="text"
            readOnly
            value={
              Math.max.apply(
                Math,
                activities.map((item) => item.id)
              ) + 1
            }
            disabled={true}
            className="form-control"
            style={{ maxWidth: "56px" }}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4">Description</label>
          <input
            id="desc"
            type="text"
            placeholder="Describe your activity"
            className="form-control"
          />
          <div className="col-ms-1" style={{ margin: "16px" }}>
            <label htmlFor="inputEmail4">Priority - {priorityDisplay} </label>
            <input
              type="range"
              className="custom-range ms-4"
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
            className={prioritiesBorderColor[act.priority]}
            style={{ width: "18rem", margin: "16px", border: "solid 2px" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">
                  <span
                    className="badge rounded-pill bg-secondary"
                    style={{ padding: "5px 8px" }}
                  >
                    {act.id}
                  </span>{" "}
                  - Title
                </h5>
                <span
                  className={prioritiesBadgeColor[act.priority]}
                  style={{ padding: "8px", margin: "8px" }}
                >
                  Priority: {act.priority}{" "}
                  <i
                    className={prioritiesIcon[act.priority]}
                    id="prior-icons"
                    style={{ fontSize: "16px" }}
                  ></i>
                </span>
              </div>
              <p className="card-text">
                {act.id} - {act.description}
              </p>
              <hr />
              <div
                className="d-flex justify-content-end"
                style={{ margin: "8px" }}
              >
                <button className="btn btn-sm btn-outline-primary me-2">
                  <i className="me-1 fa-solid fa-pen"></i> Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger me-2"
                  onClick={() => deleteActivity(act.id)}
                >
                  <i className="me-1 fa-solid fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
