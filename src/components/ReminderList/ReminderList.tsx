import { useMemo, useState } from 'react';
import styles from './ReminderList.module.scss';
import Button from '../../UI/Button';
import ReminderItem from './ReminderItem';
import NotificationModal from '../Notification/NotificationModal';
import ToastNotification from '../Notification/ToastNotification';
import { Reminder } from '../../types/types';
import { useReminderWorker } from '../../hook/useReminderWorker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  removeOverdueReminder,
  toggleNotification,
} from '../../store/reminders/overdueRemindersSlice';
import { editReminder, deleteReminder, toggleComplete } from '../../store/reminders/remindersSlice';

interface ReminderListProps {
  reminders: Reminder[];
}

const ReminderList: React.FC<ReminderListProps> = ({ reminders }) => {
  const dispatch = useDispatch();
  const { showNotification, overdueReminders } = useSelector(
    (state: RootState) => state.overdueReminders,
  );
  const filterStatus = useSelector((state: RootState) => state.reminders.filterStatus);
  const [showNotificationMessage, setShowNotificationMessage] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  // Логика воркера для показа напоминаний в модальном окне
  useReminderWorker(reminders, (_dueReminders) => {
    dispatch(toggleNotification(true));
  });

  const handleModalClose = () => {
    dispatch(toggleNotification(false));
  };

  const handleComplete = (id: string) => {
    dispatch(toggleComplete(id));

    dispatch(removeOverdueReminder(id));
  };

  const handleEdit = (updatedReminder: Reminder) => {
    dispatch(editReminder(updatedReminder));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteReminder(id));
    dispatch(removeOverdueReminder(id));
  };

  const handleSnooze = (reminder: Reminder) => {
    const currentDate = new Date();

    // Проверяем, если время напоминания просрочено
    const reminderDate = new Date(reminder.dueDate);
    const newDueDate = currentDate > reminderDate ? currentDate : reminderDate;

    // Прибавляем 10 минут
    newDueDate.setMinutes(newDueDate.getMinutes() + 10);

    // Обновляем напоминание с новой датой
    dispatch(editReminder({ ...reminder, dueDate: newDueDate.toISOString() }));
    dispatch(removeOverdueReminder(reminder.id));

    setNotificationMessage(`Напоминание "${reminder.description}" перенесено на 10 минут`);
    setShowNotificationMessage(true);
  };

  // Фильтрация напоминаний на основе статуса
  const filteredReminders = useMemo(() => {
    return reminders
      .filter((reminder) => {
        if (filterStatus === 'pending') {
          return !reminder.completed; // Ожидаемые
        } else if (filterStatus === 'completed') {
          return reminder.completed; // Выполненные
        }
        return true; // Показываем все, если фильтр сброшен
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [reminders, filterStatus]);

  // Логика для фильтрации (повторное нажатие сбрасывает фильтр)
  const toggleFilter = (status: 'pending' | 'completed') => {
    if (filterStatus === status) {
      dispatch({ type: 'reminders/setFilterStatus', payload: 'all' });
    } else {
      dispatch({ type: 'reminders/setFilterStatus', payload: status });
    }
  };

  return (
    <div className={styles.reminderList}>
      <div className={styles.filterButtons}>
        <Button
          onClick={() => toggleFilter('pending')}
          className={filterStatus === 'pending' ? styles.active : ''}>
          Ожидаемые
        </Button>
        <Button
          onClick={() => toggleFilter('completed')}
          className={filterStatus === 'completed' ? styles.active : ''}>
          Выполненные
        </Button>
      </div>

      {/* Список напоминаний после фильтрации */}
      {filteredReminders.length ? (
        filteredReminders.map((reminder) => (
          <ReminderItem
            key={reminder.id}
            reminder={reminder}
            handleComplete={handleComplete}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <p className={styles.noReminders}>Нет доступных напоминаний</p>
      )}

      {/* Модальное окно для просроченных напоминаний */}
      {showNotification && (
        <NotificationModal
          reminders={overdueReminders}
          onClose={handleModalClose}
          onSnooze={handleSnooze}
          onComplete={handleComplete}
        />
      )}

      {showNotificationMessage && (
        <ToastNotification
          message={notificationMessage}
          onClose={() => setShowNotificationMessage(false)}
        />
      )}
    </div>
  );
};

export default ReminderList;
