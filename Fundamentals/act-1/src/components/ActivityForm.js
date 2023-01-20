import {useState} from "react";

export default function ActivityForm(props) {
  const[selectedActivity,setSelectedActivity] = useState({})//useState da atividade selecionada

  const inputTextHandler = (event)=> {
    const {name,value} = event.target;
    setSelectedActivity({...selectedActivity,[name]:value})
  }

  return (
    <form className="row g-3">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="col-md-1">
          <label htmlFor="inputEmail4">Id</label>
          <input
            name="id"
            id="id"
            type="text"
            onChange={inputTextHandler}
            value={
              props.selectedActivity!== undefined?
              Math.max.apply(
                Math,
                props.activities.map((item) => item.id)
              ) + 1
              :props.selectedActivity.id
            }
            disabled = {true}
            className="form-control"
            style={{ maxWidth: "56px" }}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4">Title</label>
          <input
            name="title"
            id="title"
            value={selectedActivity.title}
            onChange={inputTextHandler}
            type="text"
            placeholder="Choose an activity title"
            className="form-control"
          />
        <div className="col-md-6">
          <label htmlFor="inputEmail4">Description</label>
          <input
            name="desc"
            id="desc"
            value={selectedActivity.description}
            onChange={inputTextHandler}
            type="text"
            placeholder="Describe your activity"
            className="form-control"
          />
          <div className="col-ms-1" style={{ margin: "16px" }}>
            <label htmlFor="inputEmail4">
              Priority - {props.priorityDisplay}{" "}
            </label>
            <input
              name="priority-range"
              id="priority-range"
              type="range"
              onChange={props.setPriority}
              value={selectedActivity.priority}
              readOnly={false}
              className="custom-range ms-4"
              min="0"
              max="2"
              step="1"
            ></input>
            {/* selector alternative to set priority level 
        <select id="set-priority">
          <option value={priorities.Low}>Low</option>
          <option value={priorities.Normal}>Normal</option>
          <option value={priorities.High}>High</option>
        </select> */}
          </div>
        </div>
        </div>
        <div className="col-12">
          <button
            className="btn btn-outline-success"
            onClick={props.addActivity}
          >
            + Activity
          </button>
        <hr />
        </div>
      </div>
    </form>
  );
}
