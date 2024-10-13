import styles from './Notification.module.scss';
import NotificationIcon from '../../assets/notification/notification_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleNotification } from '../../store/reminders/overdueRemindersSlice';

const NotificationButton: React.FC = () => {
  const dispatch = useDispatch();
  const { overdueReminders } = useSelector((state: RootState) => state.overdueReminders);

  const handleClick = () => {
    dispatch(toggleNotification(true));
  };

  return (
    <div className={styles.notificationButton} onClick={handleClick}>
      <img src={NotificationIcon} alt="notification icon" />
      <div className={styles.notificationCount}>{overdueReminders && overdueReminders.length}</div>
    </div>
  );
};

export default NotificationButton;
