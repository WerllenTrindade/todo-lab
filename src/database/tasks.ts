import { formatDate } from "@/utils/date";
import { useSQLiteContext } from "expo-sqlite";
import { Task } from "./model";

export function useTasksDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<Task, "id">): Promise<boolean> {
    const { title, description, date, startTime, endTime, priority, alert } =
      data;

    let statement;
    try {
      statement = await database.prepareAsync(`
        INSERT INTO tasks 
          (title, description, date, startTime, endTime, priority, alert, completed)
        VALUES 
          ($title, $description, $date, $startTime, $endTime, $priority, $alert, $completed)
      `);

      await statement.executeAsync({
        $title: title,
        $description: description || "",
        $date: date,
        $startTime: startTime,
        $endTime: endTime,
        $priority: priority,
        $alert: alert ? 1 : 0,
        $completed: 0,
      });

      return true;
    } catch (error) {
      console.error("Erro ao criar task:", error);
      return false;
    } finally {
      if (statement) await statement.finalizeAsync();
    }
  }

  async function getTodayTasks(): Promise<Task[]> {
    const today = formatDate(new Date());
    const query = "SELECT * FROM tasks WHERE date = ?";
    return await database.getAllAsync<Task>(query, [today]);
  }

  async function getTomorrowTasks(): Promise<Task[]> {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = formatDate(tomorrow);

    const query = "SELECT * FROM tasks WHERE date = ?";
    return await database.getAllAsync<Task>(query, [tomorrowStr]);
  }

  async function toggleCompleteTask(id: number): Promise<boolean> {
    let statement;
    try {
      const task = await database.getFirstSync<Task>(
        "SELECT completed FROM tasks WHERE id = ?",
        [id]
      );

      if (!task) return false;

      const newCompleted = task.completed ? 0 : 1;

      // Agora atualizamos
      statement = await database.prepareAsync(`
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
    const tasks = await database.getAllAsync<Task>(query, [id]);

    return tasks.length > 0 ? tasks[0] : null;
  }

  async function removeTask(id: number): Promise<boolean> {
    let statement;
    try {
      statement = await database.prepareAsync(`
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

  async function updateTask(data: Task): Promise<boolean> {
    const {
      title,
      description,
      date,
      startTime,
      endTime,
      priority,
      alert,
      completed,
    } = data;

    let statement;
    try {
      statement = await database.prepareAsync(`
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
        $title: title,
        $description: description || "",
        $date: date,
        $startTime: startTime,
        $endTime: endTime,
        $priority: priority,
        $alert: alert ? 1 : 0,
        $completed: completed ? 1 : 0,
      });

      return true;
    } catch (error) {
      console.error("Erro ao atualizar task:", error);
      return false;
    } finally {
      if (statement) await statement.finalizeAsync();
    }
  }

  return {
    create,
    getTodayTasks,
    getTomorrowTasks,
    toggleCompleteTask,
    getTasksDetails,
    removeTask,
    updateTask,
  };
}
