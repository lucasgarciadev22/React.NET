import { useState, useEffect } from "react";
import api from "../../api/Activity";
import ActivityForm from "./ActivityForm";
import ActivityListGen from "./ActivityListGen";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import { IActivity, Priority } from "../../models/IActivity";

const initialActivity: IActivity = {
  id: 0,
  description: "",
  priority: Priority.Low,
  title: "",
};

const Activity: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activity, setActivity] = useState<IActivity>(initialActivity);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseConfirm = () => {
    setActivity(initialActivity);
    setShowConfirm(false);
  };
  const handleShowConfirm = (id: number) => {
    const selectedAct = activities.filter((act) => act.id === id);
    setActivity(selectedAct[0]);
    setShowConfirm(true);
  };

  const fetchActivities = async () => {
    const response: IActivity[] = await api.get("Act2");
    return response;
  };

  useEffect(() => {
    const getActivities = async () => {
      const fetchedActivities = await fetchActivities();
      if (fetchedActivities) setActivities(fetchedActivities); //if api get request is valid set activities with loaded values.
    };
    getActivities(); //use function in useEffect
  }, [activities.length]);

  const addActivity = async (act: IActivity) => {
    const response = await api.post("Act2", act); //pass the object to api post request
    setActivities([...activities, response.data]); //pass the new object from the response to the activities array
    handleCloseForm();
  };

  function cancelActivity() {
    setActivity(initialActivity);
    handleCloseForm();
  }

  const updateActivity = async (act: IActivity) => {
    const response = await api.put(`Act2/${act.id}`, act);
    setActivities(
      activities.map((item) => (item.id === act.id ? response.data : item))
    );
    setActivity(initialActivity);

    handleCloseForm();
  };

  const deleteActivity = async (id: number) => {
    if (await api.delete(`Act2/${id}`)) {
      const filteredActs = activities.filter((act) => act.id !== id);

      setActivities([...filteredActs]);
      handleCloseConfirm();
    }
  };

  function editActivity(id: number) {
    const selectedAct = activities.filter((act) => act.id === id);
    setActivity(selectedAct[0]);
    handleShowForm();
  }

  return (
    <>
      <TitlePage title={`Activity${activity.id !== 0 ? activity.id : ""}`}>
        <Button variant="outline-success" onClick={handleShowForm}>
          <i className="i fas fa-plus me-2"></i>
          New Activity
        </Button>
      </TitlePage>
      <InputGroup className="mb-3" style={{ marginTop: "16px" }}>
        <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
        <Form.Control
          placeholder="Search clients by name..."
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <div className="div d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-dark"></div>
      <ActivityListGen
        activities={activities}
        handleShowConfirm={handleShowConfirm}
        editActivity={editActivity}
      />
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "24px" }}>
            Activity {activity.id === 0 ? "" : activity.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ActivityForm
            addActivity={addActivity}
            cancelActivity={cancelActivity}
            updateActivity={updateActivity}
            selectedActivity={activity}
          />
        </Modal.Body>
        <Modal.Footer>
          <p>Create or edit your activites...</p>
        </Modal.Footer>
      </Modal>
      <Modal size="sm" show={showConfirm} onHide={handleCloseConfirm}>
        <ModalHeader closeButton>
          <ModalTitle style={{ fontSize: "24px" }}>
            Removing Activity {activity.id === 0 ? "" : activity.id}
          </ModalTitle>
        </ModalHeader>
        <ModalBody>Are you sure you wanna remove "{activity.title}"?</ModalBody>
        <ModalFooter>
          <button
            className="btn btn-outline-success me-2"
            onClick={() => deleteActivity(activity.id)}
          >
            <i className="fa-solid fa-check me-2"></i>
            Confirm
          </button>
          <button
            className="btn btn-outline-warning"
            onClick={() => handleCloseConfirm()}
          >
            <i className="fa-solid fa-ban me-2"></i>
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      <Link to="/">Back to Home</Link>
    </>
  );
};

export default Activity;
