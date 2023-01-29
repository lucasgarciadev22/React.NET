import { useState, useEffect } from "react";

const initialActivity = {
  id: 0,
  title: "",
  priority: 0,
  description: "",
};

export default function ActivityForm(props) {
  const [activity, setActivity] = useState(currentActivity());
  const [priorityColor, setPriorityColor] = useState(handlePriorityColor());

  useEffect(() => {
    if (props.activity.id !== 0) {
      setActivity(props.activity);
    }
  }, [props.activity]);

  function handlePriorityColor(param) {
    switch (param) {
      case "1":
        return "green";
      case "2":
        return "orange";
      case "3":
        return "red";
      default:
        return "";
    }
  }

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setPriorityColor(handlePriorityColor(e.target.value)); //pick up the received object value
    setActivity({ ...activity, [name]: value }); //distribute the values  from the object to each name tag html from the form
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.activity.id !== 0) props.updateActivity(activity);
    else props.addActivity(activity);

    setActivity(initialActivity);
  };

  const handleCancel = (e) => {
    e.preventDefault();

    props.cancelActivity();

    setActivity(initialActivity);
  };

  function currentActivity() {
    if (props.activity.id !== 0) {
      return props.activity;
    } else {
      return initialActivity;
    }
  }

  return (
    <>
      <h1>Activity {activity.id !== 0 ? activity.id : ""}</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={activity.title}
            onChange={inputTextHandler}
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
            onChange={inputTextHandler}
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
            onChange={inputTextHandler}
            id="description"
            type="text"
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
                <i class="fa-solid fa-arrows-rotate me-2"></i>
                Save
              </button>
              <button
                className="btn btn-outline-warning"
                onClick={handleCancel}
              >
                <i class="fa-solid fa-ban me-2"></i>
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
