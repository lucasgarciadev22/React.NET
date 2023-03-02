import { IActivity } from "./IActivity";

export interface IActivityCardProps {
  act: IActivity;
  editActivity: (id: number) => void;
  handleShowConfirm: (id: number) => void;
}

export interface IActivityListGenProps {
  activities: IActivity[];
  editActivity: (id: number) => void;
  handleShowConfirm: (id: number) => void;
}

export interface IActivityFormProps {
  selectedActivity: IActivity;
  updateActivity: (activity: IActivity) => void;
  addActivity: (activity: IActivity) => void;
  cancelActivity: () => void;
}