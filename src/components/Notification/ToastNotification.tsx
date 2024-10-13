import React, { useEffect, useState } from 'react';
import styles from './ToastNotification.module.scss';

interface ToastNotificationProps {
  message: string;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Уведомление исчезает через 3 секунды
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 10000);

    return () => clearTimeout(timer); // Очищаем таймер при размонтировании
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${isVisible ? styles.show : styles.hide}`}>{message}</div>
  );
};

export default ToastNotification;
