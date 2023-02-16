import React from "react";

export default function ActivityCard(props) {
  function priorityLabel(param) {
    switch (param) {
      case "Low":
      case "Normal":
      case "High":
        return param;
      default:
        return "Unknown";
    }
  }

  function priorityIcon(param, icon) {
    switch (param) {
      case "Low":
        return icon ? "smile" : "success";
      case "Normal":
        return icon ? "meh" : "warning";
      case "High":
        return icon ? "frown" : "danger";
      default:
        return "Unknown";
    }
  }

  return (
    <div
      className={
        "card mb-2 shadow-sm border-" + priorityIcon(props.act.priority)
      }
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge bg-secondary me-1">{props.act.id}</span>-{" "}
            {props.act.title}
          </h5>
          <h6>
            Priority:
            <span className={"ms-1 text-" + priorityIcon(props.act.priority)}>
              <i
                className={
                  "me-1 far fa-" + priorityIcon(props.act.priority, true)
                }
              ></i>
              {priorityLabel(props.act.priority)}
            </span>
          </h6>
        </div>
        <p className="card-text">{props.act.description}</p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button
            className="btn btn-me btn-outline-primary me-2"
            onClick={() => props.editActivity(props.act.id)}
          >
            <i className="fas fa-pen me-2"></i>
            Edit
          </button>
          <button
            className="btn btn-me btn-outline-danger"
            onClick={() => props.handleShowConfirm(props.act)}
          >
            <i className="fas fa-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
