import dayjs from "dayjs";
import * as Notifications from "expo-notifications";

interface TaskNotification {
  id: number;
  title: string;
  priority?: string;
  alert: boolean;
  date: Date;
  message?: string;
}

const getNotifyDates = (date: Date) => {
  const base = dayjs(date);
  return [
    { date: base.subtract(1, "hour").toDate(), message: "⚠️ Falta 1 hora!" },
    { date: base.subtract(30, "minute").toDate(), message: "⏰ Falta 30 minutos!" },
  ];
};

async function scheduleSingleNotification({
  taskId,
  title,
  priority,
  notifyAt,
  message,
}: {
  taskId: number;
  title: string;
  priority?: string;
  notifyAt: Date;
  message: string;
}) {

  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: message,
      subtitle: priority ? `Prioridade: ${priority.toUpperCase()}` : undefined,
      sound: "default",
      data: { taskId, priority },
    },
    trigger: {
      year: notifyAt.getFullYear(),
      month: notifyAt.getMonth() + 1,
      day: notifyAt.getDate(),
      hour: notifyAt.getHours(),
      minute: notifyAt.getMinutes(),
      second: notifyAt.getSeconds(),
      repeats: false,
    } as Notifications.CalendarTriggerInput,
  });
}

export async function scheduleTaskNotifications(
  task: TaskNotification,
  updateTaskNotificationId: (taskId: number, notificationIds: string[]) => Promise<any>
) {
  if (!task.alert) return;

  const notificationIds: string[] = [];

  for (const notify of getNotifyDates(task.date)) {
    if (notify.date > new Date()) {
      const id = await scheduleSingleNotification({
        taskId: task.id,
        title: task.title,
        priority: task.priority,
        notifyAt: notify.date,
        message: notify.message!,
      });
      notificationIds.push(id);
    }
  }

  console.log('notificationIds ',notificationIds)
  if (notificationIds.length) {
    await updateTaskNotificationId(task.id, notificationIds);
  }

  return notificationIds;
}

export const cancelNotification = async (id: string) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch (error) {
    console.error("Erro ao cancelar notificação:", error);
  }
};

export const getScheduledNotifications = async () => {
  return await Notifications.getAllScheduledNotificationsAsync();
};
