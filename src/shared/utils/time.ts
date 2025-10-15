import dayjs from "dayjs";

export const timeToMinutes = (time: string): number => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const isToday = (date: string): boolean => {
  return dayjs(date).isSame(dayjs(), "day");
};

export const nowInMinutes = (): number => {
  const now = dayjs();
  return now.hour() * 60 + now.minute();
};
