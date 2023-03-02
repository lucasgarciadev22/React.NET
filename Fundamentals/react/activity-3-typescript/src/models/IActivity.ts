export enum Priority {
  Undefined,
  Low,
  Medium,
  High,
}

export interface IActivity {
  id: number;
  priority: Priority;
  title: string;
  description: string;
}