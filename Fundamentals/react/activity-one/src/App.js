import { useState, useEffect } from "react";
import api from "./api/activity";
import "./App.css";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import ActivityForm from "./components/ActivityForm";
import ActivityListGen from "./components/ActivityListGen";

function App() {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({ id: 0 });
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);

  const fetchActivities = async () => {
    const response = await api.get("Act1");
    return response.data;
  };

  useEffect(() => {
    const getActivities = async () => {
      const fetchedActivities = await fetchActivities();
      if (fetchedActivities) setActivities(fetchedActivities); //if api get request is valid set activities with loaded values.
    };
    getActivities(); //use function in useEffect
  }, []);

  const addActivity = async (act) => {
    const response = await api.post("Act1", act); //pass the object to api post request
    setActivities([...activities, response.data]); //pass the new object from the response to the activities array
    handleCloseForm(); 
  };

  function cancelActivity() {
    setActivity({ id: 0 });
    handleCloseForm();
  }

  const updateActivity = async (act) => {
    const response = await api.put(`Act1/${act.id}`, act);
    setActivities(
      activities.map((item) => (item.id === act.id ? response.data : item))
    );
    setActivity({ id: 0 });
    handleCloseForm();
  };

  const deleteActivity = async (id) => {
    if (await api.delete(`Act1/${id}`)) {
      const filteredActs = activities.filter((act) => act.id !== id);

      setActivities([...filteredActs]);
    }
  };

  function editActivity(id) {
    const selectedAct = activities.filter((act) => act.id === id);
    setActivity(selectedAct[0]);
    handleShowForm();
  }

  return (
    <>
      <div className="div d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-dark">
        <h1>Activities</h1>
        <Button variant="outline-success" onClick={handleShowForm}>
          <i className="i fas fa-plus"></i>
        </Button>
      </div>
      <ActivityListGen
        activities={activities}
        deleteActivity={deleteActivity}
        editActivity={editActivity}
      />

      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize:'24px'}}>
            Activity {activity.id === 0 ? "" : activity.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ActivityForm
            addActivity={addActivity}
            cancelActivity={cancelActivity}
            updateActivity={updateActivity}
            activity={activity}
            activities={activities}
          />
        </Modal.Body>
        <Modal.Footer>
          <p>Create or edit your activites...</p>
        </Modal.Footer>
      </Modal>
      <Modal size="sm" show={showConfirm} onHide={handleCloseConfirm}>
        <ModalHeader closeButton>
          <ModalTitle style={{fontSize:'24px'}}>
            Removing Activity {activity.id} 
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          Are you sure you wanna remove "{activity.title}"?
        </ModalBody>
        <ModalFooter>
        <button className="btn btn-outline-success me-2" 
                onClick={()=> deleteActivity(activity.id)}>
                <i class="fa-solid fa-check me-2"></i>
                Confirm
              </button>
              <button
                className="btn btn-outline-warning"
                onClick={()=> handleCloseConfirm}
              >
                <i class="fa-solid fa-ban me-2"></i>
                Cancel
              </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default App;
