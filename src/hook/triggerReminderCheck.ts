import { addOverdueReminders } from '../store/reminders/overdueRemindersSlice';
import { Reminder } from '../types/types';

export const triggerReminderCheck = (
  reminders: Reminder[],
  dispatch: any,
  onDueReminders: (dueReminders: Reminder[]) => void,
) => {
  const now = new Date();
  const dueReminders = reminders.filter((reminder) => {
    const reminderTime = new Date(reminder.dueDate);
    return !reminder.completed && reminderTime <= now;
  });

  // Обновляем просроченные напоминания
  dispatch(addOverdueReminders(dueReminders));

  // Вызываем коллбек, если передан
  if (dueReminders.length > 0 && onDueReminders) {
    onDueReminders(dueReminders);
  }
};
