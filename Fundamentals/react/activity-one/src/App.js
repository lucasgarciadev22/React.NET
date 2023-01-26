import { useState, useEffect } from "react";
import api from "./api/activity";
import "./App.css";
import ActivityForm from "./components/ActivityForm";
import ActivityListGen from "./components/ActivityListGen";

function App() {
  const [index] = useState(0);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({ id: 0 });

  const fetchActivities = async () => {
    const response = await api.get("activity");
    return response.data;
  };

  useEffect(() => {
    const getActivities = async () => {
      const fetchedActivities = await fetchActivities();
      if (fetchedActivities) setActivities(fetchActivities); //if api get request is valid set activities with loaded values.
    };
    getActivities();//use function in useEffect
  }, []);

  function addActivity(act) {
    setActivities([...activities, { ...act, id: index }]);
  }

  function cancelActivity() {
    setActivity({ id: 0 });
  }

  function updateActivity(ativ) {
    setActivities(
      activities.map((item) => (item.id === ativ.id ? ativ : item))
    );
    setActivity({ id: 0 });
  }

  function deleteActivity(id) {
    const filteredActs = activities.filter((atividade) => atividade.id !== id);
    setActivities([...filteredActs]);
  }

  function editActivity(id) {
    const selectedAct = activities.filter((atividade) => atividade.id === id);
    setActivity(selectedAct[0]);
  }

  return (
    <>
      <ActivityForm
        addActivity={addActivity}
        cancelActivity={cancelActivity}
        updateActivity={updateActivity}
        activity={activity}
        activities={activities}
      />
      <ActivityListGen
        activities={activities}
        deleteActivity={deleteActivity}
        editActivity={editActivity}
      />
    </>
  );
}

export default App;
