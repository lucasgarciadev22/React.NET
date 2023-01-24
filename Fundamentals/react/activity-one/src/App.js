import { useState, useEffect } from 'react';
import './App.css';
import ActivityForm from './components/ActivityForm';
import ActivityListGen from './components/ActivityListGen';

function App() {
    const [index, setIndex] = useState(0);
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState({ id: 0 });

    useEffect(() => {
        activities.length <= 0
            ? setIndex(1)
            : setIndex(
                  Math.max.apply(
                      Math,
                      activities.map((item) => item.id)
                  ) + 1
              );
    }, [activities]);

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
        const filteredActs = activities.filter(
            (atividade) => atividade.id !== id
        );
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