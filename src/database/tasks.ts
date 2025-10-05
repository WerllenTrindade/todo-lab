import dayjs from "dayjs";
import { useSQLiteContext } from "expo-sqlite";
import { CreateTask, Task } from "./model";

export function useTasksDatabase() {
  const { prepareAsync, getAllAsync, getFirstSync } = useSQLiteContext();

  async function create(data: Omit<Task, "id">): Promise<CreateTask> {
    const { title, description, date, startTime, endTime, priority, alert } =
      data;

    let statement;
    try {
      statement = await prepareAsync(`
        INSERT INTO tasks 
          (title, description, date, startTime, endTime, priority, alert, completed)
        VALUES 
          ($title, $description, $date, $startTime, $endTime, $priority, $alert, $completed)
      `);

      const result = await statement.executeAsync({
        $title: title,
        $description: description || "",
        $date: date,
        $startTime: startTime,
        $endTime: endTime,
        $priority: priority,
        $alert: alert ? 1 : 0,
        $completed: 0,
      });

      return { insertedId: result?.lastInsertRowId.toLocaleString()}
    } catch (error) {
      throw error;
    } finally {
      if (statement) await statement.finalizeAsync();
    }
  }

  async function getTodayTasks(): Promise<Task[]> {
    const today = dayjs().format("YYYY-MM-DD");
    const query = "SELECT * FROM tasks WHERE date LIKE ?";
    return await getAllAsync<Task>(query, [`${today}%`]);
  }

  async function getTasksFromDayAfterTomorrow(): Promise<Task[]> {
    const tomorrow = dayjs().add(1, "day").startOf("day").format("YYYY-MM-DD");
  
    const query = "SELECT * FROM tasks WHERE date >= ?";
    return await getAllAsync<Task>(query, [tomorrow]);
  }

  async function getAllTasks(): Promise<Task[]> {
    const query = "SELECT * FROM tasks";
    return await getAllAsync<Task>(query);
  }

  async function toggleCompleteTask(id: number): Promise<boolean> {
    let statement;
    try {
      const task = await getFirstSync<Task>(
        "SELECT completed FROM tasks WHERE id = ?",
        [id]
      );

      if (!task) return false;

      const newCompleted = task.completed ? 0 : 1;

      // Agora atualizamos
      statement = await prepareAsync(`
        UPDATE tasks
        SET completed = $completed
        WHERE id = $id
      `);

      await statement.executeAsync({
        $completed: newCompleted,
        $id: id,
      });

      return true;
    } catch (error) {
      console.error("Erro ao alternar task:", error);
      return false;
    } finally {
      if (statement) await statement.finalizeAsync();
    }
  }

  async function getTasksDetails(id: number): Promise<Task | null> {
    const query = `SELECT * FROM tasks WHERE id = ?`;
    const tasks = await getAllAsync<Task>(query, [id]);

    return tasks.length > 0 ? tasks[0] : null;
  }

  async function removeTask(id: number): Promise<boolean> {
    let statement;
    try {
      statement = await prepareAsync(`
        DELETE FROM tasks
        WHERE id = $id
      `);

      await statement.executeAsync({ $id: id });

      return true;
    } catch (error) {
      console.error("Erro ao remover task:", error);
      return false;
    } finally {
      if (statement) await statement.finalizeAsync();
    }
  }

  async function updateTask(data: Task): Promise<CreateTask> {
    const {
      title,
      description,
      date,
      startTime,
      endTime,
      priority,
      alert,
      completed,
      id,
    } = data;

    let statement;
    try {
      statement = await prepareAsync(`
      UPDATE tasks
      SET 
        title = $title,
        description = $description,
        date = $date,
        startTime = $startTime,
        endTime = $endTime,
        priority = $priority,
        alert = $alert,
        completed = $completed
      WHERE id = $id
    `);

      await statement.executeAsync({
        $id: id!,
        $title: title,
        $description: description || "",
        $date: date,
        $startTime: startTime,
        $endTime: endTime,
        $priority: priority,
        $alert: alert ? 1 : 0,
        $completed: completed ? 1 : 0,
      });
      
     return { insertedId: id!.toString() }
    } catch (error) {
      console.error("Erro ao atualizar task:", error);
      throw error;
    } finally {
      if (statement) await statement.finalizeAsync();
    }
  }

  async function updateTaskNotificationId(id: number, notificationId: string[]): Promise<boolean> {
    let statement;
    
    
    try {
      statement = await prepareAsync(`
        UPDATE tasks
        SET notificationId = $notificationId
        WHERE id = $id
      `);

      await statement.executeAsync({
        $id: id,
        $notificationId: JSON.stringify(notificationId),
      });

      return true;
    } catch (error) {
      console.error("Erro ao atualizar notificationId da task:", error);
      return false;
    } finally {
      if (statement) await statement.finalizeAsync();
    }
  }

  return {
    create,
    getAllTasks,
    getTodayTasks,
    getTasksFromDayAfterTomorrow,
    toggleCompleteTask,
    getTasksDetails,
    removeTask,
    updateTask,
    updateTaskNotificationId
  };
}
