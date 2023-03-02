import { Activity } from "./Activity";

export interface ActivityCardProps {
  act: Activity;
  editActivity: (id: number) => void;
  handleShowConfirm: (id: number) => void;
}

export interface ActivityListGenProps {
  activities: Activity[];
  editActivity: (id: number) => void;
  handleShowConfirm: (id: number) => void;
}
