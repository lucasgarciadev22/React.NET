import { ActivityListGenProps } from "../../models/ActivityProps";
import ActivityCard from "./ActivityCard";

const ActivityListGen: React.FC<ActivityListGenProps> = ({
  activities,
  editActivity,
  handleShowConfirm,
}: ActivityListGenProps) => {
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
