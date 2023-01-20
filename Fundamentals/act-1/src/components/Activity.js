import React from "react";
const prioritiesBadgeColor = {
  Low: "badge bg-success",
  Normal: "badge bg-warning text-dark ",
  High: "badge bg-danger",
};
const prioritiesBorderColor = {
  Low: "card mb-2 shadow-sm border-success",
  Normal: "card mb-2 shadow-sm border-warning",
  High: "card mb-2 shadow-sm border-danger",
};
const prioritiesIcon = {
  Low: "ms-1 fa-regular fa-face-smile-beam",
  Normal: "ms-1 fa-regular fa-face-meh",
  High: "ms-1 fa-regular fa-face-frown",
};
export default function Activity(props) {
  return (
    <div
    className={prioritiesBorderColor[props.act.priority]}
    style={{ width: "25rem", margin: "16px", border: "solid 2px" }}
  >
    <div className="card-body">
      <div className="d-flex justify-content-between" style={{alignItems:'center',marginBottom:'16px'}}>
        <h5 className="card-title">
          <span
            className="badge rounded-pill bg-secondary"
            style={{ padding: "5px 8px" }}
          >
            {props.act.id}
          </span>{" "}
          - {props.act.title}
        </h5>
        <span
          className={prioritiesBadgeColor[props.act.priority]}
          style={{ padding: "8px", margin: "8px" }}
        >
          Priority: {props.act.priority}{" "}
          <i
            className={prioritiesIcon[props.act.priority]}
            id="prior-icons"
            style={{ fontSize: "16px" }}
          ></i>
        </span>
      </div>
      <p className="card-text">
        {props.act.id} - {props.act.description}
      </p>
      <hr />
      <div
        className="d-flex justify-content-end"
        style={{ margin: "8px" }}
      >
        <button className="btn btn-sm btn-outline-primary me-2"
         onClick={() => props.editActivity(props.act.id)}
         >
          <i className="me-1 fa-solid fa-pen"></i> Edit
        </button>
        <button
          className="btn btn-sm btn-outline-danger me-2"
          onClick={() => props.deleteActivity(props.act.id)}
        >
          <i className="me-1 fa-solid fa-trash"></i> Delete
        </button>
      </div>
    </div>
  </div>
    
  );
}
