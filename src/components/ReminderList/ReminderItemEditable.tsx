import React, { useState } from 'react';
import styles from './ReminderItemEditable.module.scss';
import { Reminder } from '../../types/types'; // Импорт типов напоминаний
import Button from '../../UI/Button';

interface ReminderItemEditableProps {
  reminder: Reminder;
  onSave: (updatedReminder: Reminder) => void;
  onCancel: () => void;
}

const ReminderItemEditable: React.FC<ReminderItemEditableProps> = ({
  reminder,
  onSave,
  onCancel,
}) => {
  const [description, setDescription] = useState(reminder.description);
  const [dueDate, setDueDate] = useState(reminder.dueDate);

  const handleSave = () => {
    onSave({
      ...reminder,
      description,
      dueDate,
    });
    onCancel();
  };

  return (
    <div className={styles.reminderItemEditable}>
      <div className={styles.reminderFormEditable}>
        <label htmlFor="description">Описание:</label>
        <textarea
          rows={3}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.descriptionInput}
        />

        {!reminder.completed && (
          <>
            <label htmlFor="dueDate">Дата и время:</label>
            <input
              id="dueDate"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={styles.dueDateInput}
            />
          </>
        )}
      </div>

      <div className={styles.reminderActions}>
        <Button className={`${styles.btn} ${styles.saveBtn}`} onClick={handleSave}>
          Сохранить
        </Button>
        <Button className={`${styles.btn} ${styles.cancelBtn}`} onClick={onCancel}>
          Отменить
        </Button>
      </div>
    </div>
  );
};

export default ReminderItemEditable;
