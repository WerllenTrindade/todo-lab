export function useTimePicker(){
    
    function parseTime(value?: string | Date) {
  if (!value) return new Date();
  if (value instanceof Date) return value;

  const [hours, minutes] = value.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

    return {
        parseTime
    }
}