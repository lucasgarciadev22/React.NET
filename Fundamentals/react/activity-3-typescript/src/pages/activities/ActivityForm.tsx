import React, { useState, useEffect } from "react";
import { IActivity, Priority } from "../../models/IActivity";
import { IActivityFormProps } from "../../models/IActivityProps";

const initialActivity: IActivity = {
  id: 0,
  description: "",
  priority: Priority.Low,
  title: "",
};

const ActivityForm: React.FC<IActivityFormProps> = ({
  selectedActivity,
  updateActivity,
  addActivity,
  cancelActivity,
}: IActivityFormProps) => {
  const [activity, setActivity] = useState<IActivity>(currentActivity());
  const [priorityColor, setPriorityColor] = useState(handlePriorityColor());

  useEffect(() => {
    if (selectedActivity.id !== 0) {
      setActivity(selectedActivity);
    }
  }, [selectedActivity]);

  function handlePriorityColor(param?: Priority) {
    switch (param) {
      case Priority.Low:
        return "green";
      case Priority.Medium:
        return "orange";
      case Priority.High:
        return "red";
      default:
        return "";
    }
  }

  function handlePriorityChange(name: string, value: string) {
    const priority = Priority[value as keyof typeof Priority]; // convert string value to enum value
    setPriorityColor(handlePriorityColor(priority)); //pick up the received object value
    setActivity({ ...activity, [name]: value }); //distribute the values  from the object to each name tag html from the form
  }

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // separate object name and value from the received object
    handlePriorityChange(name, value);
  };

  const handleSelectText = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;// separate object name and value from the received object
    handlePriorityChange(name, value);
  };

  const handleTextAreaText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handlePriorityChange(name, value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedActivity.id !== 0) updateActivity(activity);
    else addActivity(activity);

    setActivity(initialActivity);
  };

  const handleButtonCancel = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    cancelActivity();

    setActivity(initialActivity);
  };

  function currentActivity(): IActivity {
    if (selectedActivity.id !== 0) {
      return selectedActivity;
    } else {
      return initialActivity;
    }
  }

  return (
    <>
      <h1>Activity {activity.id !== 0 ? activity.id : ""}</h1>
      <form className="row g-3" onSubmit={handleFormSubmit}>
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={activity.title}
            onChange={handleInputText}
            id="title"
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Priority</label>
          <select
            style={{ borderColor: priorityColor }}
            name="priority"
            value={activity.priority}
            onChange={handleSelectText}
            id="priority"
            className="form-select"
          >
            <option defaultValue="Low">Select...</option>
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={activity.description}
            onChange={handleTextAreaText}
            id="description"
            className="form-control"
          />
          <hr />
        </div>
        <div className="col-12 mt-0">
          {activity.id === 0 ? (
            <button className="btn btn-outline-secondary" type="submit">
              <i className="fas fa-plus me-2"></i>
              New
            </button>
          ) : (
            <>
              <button className="btn btn-outline-success me-2" type="submit">
                <i className="fa-solid fa-arrows-rotate me-2"></i>
                Save
              </button>
              <button
                className="btn btn-outline-warning"
                onClick={handleButtonCancel}
              >
                <i className="fa-solid fa-ban me-2"></i>
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default ActivityForm;
