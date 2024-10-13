import { useState } from 'react';
import styles from './ReminderItem.module.scss';
import Button from '../../UI/Button';
import ReminderItemEditable from './ReminderItemEditable';
import { Reminder } from '../../types/types';
import { formatDate } from '../../utils/dateUtils';

interface ReminderItemProps {
  reminder: Reminder;
  handleEdit: (updatedReminder: Reminder) => void;
  handleComplete: (id: string) => void;
  handleDelete: (id: string) => void;
}

const ReminderItem: React.FC<ReminderItemProps> = ({
  reminder,
  handleEdit,
  handleComplete,
  handleDelete,
}) => {
  const [editable, setEditing] = useState<boolean>(false);

  const stylesInfo = `${styles.reminderItem} ${reminder.completed ? styles.completed : ''}`;

  return (
    <div className={stylesInfo}>
      {editable ? (
        <div className={styles.reminderFormEditable}>
          <ReminderItemEditable
            reminder={reminder}
            onSave={(updatedReminder) => handleEdit(updatedReminder)}
            onCancel={() => setEditing(false)}
          />
        </div>
      ) : (
        <>
          <div className={styles.reminderInfo}>
            <h4>{reminder.description}</h4>
            <p>
              {reminder.completed ? 'Выполнено' : 'Не выполнено'}: {formatDate(reminder.dueDate)}
            </p>
          </div>
          <div className={styles.reminderActions}>
            <Button
              className={`${styles.btn} ${styles.completeBtn}`}
              onClick={() => handleComplete(reminder.id)}
              disabled={reminder.completed}>
              Завершить
            </Button>
            <Button className={`${styles.btn} ${styles.editBtn}`} onClick={() => setEditing(true)}>
              Изменить
            </Button>
            <Button
              className={`${styles.btn} ${styles.deleteBtn}`}
              onClick={() => handleDelete(reminder.id)}>
              Удалить
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReminderItem;
