import { configureStore } from '@reduxjs/toolkit';
import remindersReducer from './reminders/remindersSlice';
import overdueRemindersReducer from './reminders/overdueRemindersSlice';
import {
  loadRemindersState,
  saveRemindersState,
  loadOverdueRemindersState,
} from '../utils/localStorageUtils';

// Загружаем состояние из localStorage
const preloadedRemindersState = loadRemindersState();
const preloadedOverdueRemindersState = loadOverdueRemindersState();

export const store = configureStore({
  reducer: {
    reminders: remindersReducer,
    overdueReminders: overdueRemindersReducer,
  },
  preloadedState: {
    reminders: preloadedRemindersState ?? { reminders: [], filterStatus: 'pending' },
    overdueReminders: preloadedOverdueRemindersState ?? {
      overdueReminders: [],
      showNotification: false,
    },
  },
});

// Подписываемся на изменения состояния и сохраняем его в localStorage
store.subscribe(() => {
  const state = store.getState();
  saveRemindersState(state.reminders); // Сохраняем состояние напоминаний
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
