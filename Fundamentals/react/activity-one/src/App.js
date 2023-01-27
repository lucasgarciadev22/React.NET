import { useState, useEffect } from "react";
import api from "./api/activity";
import "./App.css";
import ActivityForm from "./components/ActivityForm";
import ActivityListGen from "./components/ActivityListGen";

function App() {

  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({ id: 0 });

  const fetchActivities = async () => {
    const response = await api.get("Act1");
    return response.data;
  };

  useEffect(() => {
    const getActivities = async () => {
      const fetchedActivities = await fetchActivities();
      if (fetchedActivities) setActivities(fetchedActivities); //if api get request is valid set activities with loaded values.
    };
    getActivities();//use function in useEffect
  }, []);

  const addActivity = async (act) => {
    const response = await api.post("Act1",act);//pass the object to api post request
    setActivities([...activities, response.data]);//pass the new object from the response to the activities array
  }

  function cancelActivity() {
    setActivity({ id: 0 });
  }

  const updateActivity = async (id,act) => {
    const response = await api.put(`Act1/${id}`,act);
    setActivities(
      activities.map((item) => (item.id === id ? response.data : item))
    );
    setActivity({ id: 0 });
  }

  const deleteActivity = async (id) => {
    if (await api.delete(`Act1/${id}`))
    {  const filteredActs = activities.filter((atividade) => atividade.id !== id);
      setActivities([...filteredActs]);}
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
