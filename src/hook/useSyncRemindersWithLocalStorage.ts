import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Подписываемся на изменения состояния напоминаний и сохраняем в localStorage
export const useSyncRemindersWithLocalStorage = () => {
  const reminders = useSelector((state: RootState) => state.reminders);
  const overdueReminders = useSelector((state: RootState) => state.overdueReminders);

  useEffect(() => {
    // Сохраняем обновлённый список в localStorage
    localStorage.setItem('remindersState', JSON.stringify(reminders));
    localStorage.setItem('overdueRemindersState', JSON.stringify(overdueReminders));
  }, [reminders, overdueReminders]);
};
