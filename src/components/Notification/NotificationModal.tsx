import styles from './Notification.module.scss';
import Button from '../../UI/Button';
import { Reminder } from '../../types/types';
import { formatDate } from '../../utils/dateUtils';

interface NotificationModalProps {
  reminders: Reminder[];
  onClose: () => void;
  onSnooze: (reminder: Reminder) => void;
  onComplete: (id: string) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  reminders,
  onClose,
  onSnooze,
  onComplete,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Напоминания</h3>
        {reminders && reminders.length ? (
          <ul>
            {reminders.map((reminder) => (
              <li
                key={reminder.id}
                className={`${styles.reminderItem} ${reminder.completed ? styles.completed : ''}`}>
                <div>
                  <p>{reminder.description}</p>
                  <p>{formatDate(reminder.dueDate)}</p>
                </div>
                <div className={styles.actions}>
                  <Button
                    onClick={() => onComplete(reminder.id)}
                    className={`${styles.btn} ${styles.completeBtn}`}
                    disabled={reminder.completed}>
                    OK
                  </Button>
                  <Button
                    onClick={() => onSnooze(reminder)}
                    className={`${styles.btn} ${styles.snoozeBtn}`}>
                    Напомнить позже
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет активных напоминаний</p>
        )}
        <Button onClick={onClose} className={styles.closeButton}>
          Закрыть
        </Button>
      </div>
    </div>
  );
};

export default NotificationModal;
