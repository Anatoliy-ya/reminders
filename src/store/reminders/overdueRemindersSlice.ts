import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reminder, OverdueRemindersState } from '../../types/types';
import { saveOverdueRemindersState } from '../../utils/localStorageUtils';

const initialState: OverdueRemindersState = {
  overdueReminders: [],
  showNotification: false,
};

const overdueRemindersSlice = createSlice({
  name: 'overdueReminders',
  initialState,
  reducers: {
    addOverdueReminders: (state, action: PayloadAction<Reminder[]>) => {
      if (!Array.isArray(state.overdueReminders)) {
        state.overdueReminders = [];
      }
      const overdueReminder = action.payload.filter(
        (overdueReminder) => !state.overdueReminders.some((r) => r.id === overdueReminder.id),
      );
      state.overdueReminders.push(...overdueReminder);
      saveOverdueRemindersState(state);
    },
    removeOverdueReminder: (state, action: PayloadAction<string>) => {
      if (Array.isArray(state.overdueReminders)) {
        state.overdueReminders = state.overdueReminders.filter((r) => r.id !== action.payload);
      }
      saveOverdueRemindersState(state);
    },
    clearOverdueReminders: (state) => {
      state.overdueReminders = [];
      saveOverdueRemindersState(state);
    },
    toggleNotification: (state, action: PayloadAction<boolean>) => {
      state.showNotification = action.payload; // Управляем показом/скрытием уведомления
    },
  },
});

// Экспортируем действия
export const {
  addOverdueReminders,
  removeOverdueReminder,
  clearOverdueReminders,
  toggleNotification,
} = overdueRemindersSlice.actions;
export default overdueRemindersSlice.reducer;
