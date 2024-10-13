import { useEffect } from 'react';
import { Reminder } from '../types/types';
import { useDispatch } from 'react-redux';
import { addOverdueReminders } from '../store/reminders/overdueRemindersSlice';

// Добавим коллбек как второй аргумент
export const useReminderWorker = (
  reminders: Reminder[],
  onDueReminders: (dueReminders: Reminder[]) => void,
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (reminders.length === 0) return;
    // Запускаем проверку каждую минуту
    const interval = setInterval(() => {
      const now = new Date();
      const dueReminders = reminders.filter((reminder) => {
        const reminderTime = new Date(reminder.dueDate);
        if (!reminder.completed && reminderTime <= now) {
          return true;
        }

        return false;
      });
      dispatch(addOverdueReminders(dueReminders));

      // Если есть напоминания, время которых наступило, вызываем коллбек
      if (dueReminders.length > 0) {
        onDueReminders(dueReminders);
      }
    }, 60000); // Проверяем каждую минуту

    return () => clearInterval(interval); // Очищаем интервал при размонтировании
  }, [reminders, onDueReminders, dispatch]);
};
