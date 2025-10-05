import { Task } from "@/database/model";
import { useTasksDatabase } from "@/database/tasks";
import dayjs from "dayjs";
import { useCallback } from "react";
import { scheduleTaskNotifications } from "./notificationsService";

export function useTaskService() {
  const db = useTasksDatabase();

  const handleNotifications = useCallback(
    async (task: Task | Omit<Task, "id" | "notificationId">, id: number) => {
      if (!task.alert) return;
      await scheduleTaskNotifications(
        { ...task, id, date: dayjs(task.date).toDate() },
        db.updateTaskNotificationId
      );
    },
    [db.updateTaskNotificationId]
  );

  const addTask = useCallback(
    async (task: Omit<Task, "id" | "notificationId">) => {
      if (!task.title) return false;

      const { insertedId } = await db.create(task);
      if (!insertedId) return false;

      await handleNotifications(task, Number(insertedId));
      return true;
    },
    [db.create, handleNotifications]
  );

  const editTask = useCallback(
    async (task: Task) => {
      if (!task.id || !task.title) return false;

      const { insertedId } = await db.updateTask(task);
      if (!insertedId) return false;

      
      await handleNotifications(task, Number(insertedId));
      return true;
    },
    [db.updateTask, handleNotifications]
  );

  return {
    addTask,
    editTask,
    deleteTask: db.removeTask,
    fetchTodayTasks: db.getTodayTasks,
    fetchTomorrowTasks: db.getTasksFromDayAfterTomorrow,
    updateCompleteTask: db.toggleCompleteTask,
    fetchTaskDetails: db.getTasksDetails,
    allTasks: db.getAllTasks,
  };
}
