import { useState } from "react";
import "./App.css";
import ActivityForm from "./components/ActivityForm";
import Activity from "./components/Activity";
import ActivityList from "./components/ActivityList";
//create container with activities (initial values)
const priorities = { 0: "Low", 1: "Normal", 2: "High" }; //enum
let initialContainerState = [
  {
    id: 1,
    title:"First Activity",
    description: "This is my first activity",
    priority: priorities[0],
  },
];
//start app here with all the functions and elements to be rendered by react
function App() {
  //declare activities array and pass initialstate
  const [activities, setActivities] = useState(initialContainerState);
  const [activity, setActivity] = useState({});//no init value
  const [priorityDisplay, changePriorityDisplay] = useState(priorities[0]);
  //add activity to the lists
  function addActivity(event) {
    event.preventDefault();
    const activity = {
      id: document.getElementById("id").value,
      title:document.getElementById("title").value,
      description: document.getElementById("desc").value,
      priority: priorityDisplay,
    };

    activities.push(activity);
    setActivities([...activities]);
    //or removing push and settingo a new obj with spread operator -> setActivities([...activities], {...activity})
  }
  //edit selected activity
  function editActivity(id) {
    const selectedActivity = activities.filter(
      (activity) => activity.id === id
    );
    setActivity(selectedActivity[0]);//return single item from array and setState for activity const
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
      <ActivityForm
        addActivity={addActivity}
        selectedActivity = {activity}
        activities={activities}
        setPriority={setPriority}
        priorityDisplay={priorityDisplay}
      />
      {/* generate container list and cards */}
      <h1>List:</h1>
      <div className="mt-3">
        <ul className="list-group">
          {activities.map((act) => (
            <ActivityList key={act.id} act={act} />
          ))}
        </ul>
      </div>
      <hr />
      <h1>Cards:</h1>
      <div className="mt-3" style={{ display: "flex", flexWrap: "wrap" }}>
        {activities.map((act) => (
          <Activity
            key={act.id}
            activities={activities}
            editActivity={editActivity}
            deleteActivity={deleteActivity}
            act={act}
          />
        ))}
      </div>
    </>
  );
}

export default App;
