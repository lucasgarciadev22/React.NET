import { IActivityListGenProps } from "../../models/IActivityProps";
import ActivityCard from "./ActivityCard";

const ActivityListGen: React.FC<IActivityListGenProps> = ({
  activities,
  editActivity,
  handleShowConfirm,
}: IActivityListGenProps) => {
  return (
    <div className="mt-3">
      {activities.length > 0 ? (
        activities.map((act) => (
          <ActivityCard
            key={act.id}
            act={act}
            handleShowConfirm={handleShowConfirm}
            editActivity={editActivity}
          />
        ))
      ) : (
        <p>No activities to display</p>
      )}
    </div>
  );
};

export default ActivityListGen;
