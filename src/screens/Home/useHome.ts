import { Task } from "@/database/model";
import { useTaskService } from "@/service/taskService";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";

export function useHome() {
  const { fetchTodayTasks, fetchTomorrowTasks, updateCompleteTask, allTasks } = useTaskService();
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [tomorrowTasks, setTomorrowTasks] = useState<Task[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  

  async function loadTasks() {
    const today = await fetchTodayTasks();
    const tomorrow = await fetchTomorrowTasks();

    console.log('allTasks ', await allTasks())

    setTodayTasks(today);
    setTomorrowTasks(tomorrow);
  }

  const todayTasksCount = useMemo(() => todayTasks?.length, [todayTasks]);
  const completedTasksCount = useMemo(
    () => todayTasks.filter((x) => x.completed).length,
    [todayTasks]
  );

  const progress = useMemo(() => {
  if (todayTasks.length === 0) return 0;

  return completedTasksCount / todayTasks.length;
}, [completedTasksCount, todayTasks]);

  return {
    tomorrowTasks,
    todayTasks,
    todayTasksCount,
    completedTasksCount,
    progress,
    updateCompleteTask
  };
}
