import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import ReminderList from './components/ReminderList/ReminderList';

import { useSelector } from 'react-redux';
import { RootState } from './store/store';

import { useSyncRemindersWithLocalStorage } from './hook/useSyncRemindersWithLocalStorage';

const App: React.FC = () => {
  const { reminders } = useSelector((state: RootState) => state.reminders);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  useSyncRemindersWithLocalStorage();

  const toggleForm = () => {
    setFormVisible((prev: boolean) => !prev);
  };

  return (
    <div className="App">
      <Header isFormVisible={isFormVisible} toggleForm={toggleForm} />
      <ReminderList reminders={reminders} />
    </div>
  );
};

export default App;
