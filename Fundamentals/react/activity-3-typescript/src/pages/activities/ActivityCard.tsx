import { Priority } from "../../models/IActivity";
import { IActivityCardProps } from "../../models/IActivityProps";

const ActivityCard: React.FC<IActivityCardProps> = ({
  act,
  editActivity,
  handleShowConfirm,
}: IActivityCardProps) => {
  function priorityLabel(param: Priority) {
    switch (param) {
      case Priority.Low:
        return "Low"
      case Priority.Medium:
        return "Medium"
      case Priority.High:
        return "High";
      default:
        return "Undefined";
    }
  }

  function priorityIcon(param: Priority, icon: boolean) {
    switch (param) {
      case Priority.Low:
        return icon ? "smile" : "success";
      case Priority.Medium:
        return icon ? "meh" : "warning";
      case Priority.High:
        return icon ? "frown" : "danger";
      default:
        return "Unknown";
    }
  }

  return (
    <div className={"card mb-2 shadow-sm border-" + priorityIcon(act.priority, false)}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge bg-secondary me-1">{act.id}</span>-{" "}
            {act.title}
          </h5>
          <h6>
            Priority:
            <span className={"ms-1 text-" + priorityIcon(act.priority, false)}>
              <i
                className={"me-1 far fa-" + priorityIcon(act.priority, true)}
              ></i>
              {priorityLabel(act.priority)}
            </span>
          </h6>
        </div>
        <p className="card-text">{act.description}</p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button
            className="btn btn-me btn-outline-primary me-2"
            onClick={() => editActivity(act.id)}
          >
            <i className="fas fa-pen me-2"></i>
            Edit
          </button>
          <button
            className="btn btn-me btn-outline-danger"
            onClick={() => handleShowConfirm(act.id)}
          >
            <i className="fas fa-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
