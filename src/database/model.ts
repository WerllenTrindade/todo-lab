export type Priority = "baixa" | "media" | "alta";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  priority: Priority;
  alert: boolean;
  completed?: boolean;
}
