import { useState } from 'react';
import styles from './ReminderForm.module.scss';
import { Reminder } from '../../types/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addReminder } from '../../store/reminders/remindersSlice';

interface ReminderFormProps {
  onClose: () => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !date) return;

    const newReminder: Reminder = {
      id: Date.now().toString(),
      description,
      dueDate: date,
      completed: false,
    };

    dispatch(addReminder(newReminder)); // Отправляем новое напоминание в Redux Store
    setDescription(''); // Очищаем поле ввода описания
    setDate(''); // Очищаем поле ввода даты
    onClose(); // Закрываем форму после добавления напоминания
  };

  return (
    <form className={styles.reminderForm} onSubmit={handleSubmit}>
      <h2>Добавить Напоминание</h2>
      <div className={styles.formGroup}>
        <label htmlFor="description">Описание</label>
        <textarea
          rows={3}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="date">Дата выполнения</label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Добавить</button>
    </form>
  );
};

export default ReminderForm;
