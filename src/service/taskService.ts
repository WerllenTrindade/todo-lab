import { Task } from "@/database/model";
import { useTasksDatabase } from "@/database/tasks";
import { useCallback } from "react";

export function useTaskService() {
  const {
    create,
    getTodayTasks,
    updateTask,
    removeTask,
    getTomorrowTasks,
    toggleCompleteTask,
    getTasksDetails,
  } = useTasksDatabase();

  const addTask = useCallback(
    async (task: Omit<Task, "id">): Promise<boolean> => {
      if (!task.title) return false;
      return await create(task);
    },
    [create]
  );

  const editTask = useCallback(
    async (task: Task): Promise<boolean> => {
      if (!task.id || !task.title) return false;
      console.log(task)
      return await updateTask(task);
    },
    [updateTask]
  );

  const fetchTodayTasks = useCallback(async (): Promise<Task[]> => {
    return await getTodayTasks();
  }, [getTodayTasks]);

  const fetchTomorrowTasks = useCallback(async (): Promise<Task[]> => {
    return await getTomorrowTasks();
  }, [getTomorrowTasks]);

  const updateCompleteTask = useCallback(
    async (id: number): Promise<boolean> => {
      return await toggleCompleteTask(id);
    },
    [toggleCompleteTask]
  );

  const fetchTaskDetails = useCallback(
    async (id: number): Promise<Task | null> => {
      return await getTasksDetails(id);
    },
    [getTasksDetails]
  );

  const deleteTask = useCallback(
    async (id: number): Promise<boolean> => {
      return await removeTask(id);
    },
    [removeTask]
  );

  return {
    addTask,
    deleteTask,
    fetchTodayTasks,
    fetchTomorrowTasks,
    editTask,
    updateCompleteTask,
    fetchTaskDetails,
  };
}
