import styles from './Header.module.scss';
import Button from '../../UI/Button';
import NotificationButton from '../Notification/NotificationButton';
import ReminderForm from '../ReminderForm/ReminderForm';

interface HeaderProps {
  isFormVisible: boolean;
  toggleForm: () => void;
}

const Header: React.FC<HeaderProps> = ({ isFormVisible, toggleForm }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerButtons}>
        <Button onClick={toggleForm}>{isFormVisible ? 'Закрыть' : 'Добавить Напоминание'}</Button>
        <div className={styles.headerNotification}>
          <NotificationButton />
        </div>
        <div className={styles.headerForm}>
          {isFormVisible && <ReminderForm onClose={toggleForm} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
