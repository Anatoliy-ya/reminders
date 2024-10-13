import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reminder, RemindersState } from '../../types/types';

const initialState: RemindersState = {
  reminders: [],
  filterStatus: 'pending',
};

const remindersSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    addReminder: (state, action: PayloadAction<Reminder>) => {
      state.reminders.push(action.payload);
    },
    editReminder: (state, action: PayloadAction<Reminder>) => {
      const index = state.reminders.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.reminders[index] = action.payload;
      }
    },
    deleteReminder: (state, action: PayloadAction<string>) => {
      state.reminders = state.reminders.filter((r) => r.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const reminder = state.reminders.find((r) => r.id === action.payload);
      if (reminder) {
        reminder.completed = !reminder.completed;
        reminder.dueDate = new Date().toISOString();
      }
    },
    setState: (_state, action: PayloadAction<RemindersState>) => {
      return action.payload; // Устанавливаем состояние из localStorage
    },
    setFilterStatus: (state, action: PayloadAction<'pending' | 'completed'>) => {
      state.filterStatus = action.payload; // Устанавливаем статус фильтра
    },
  },
});

// Экспортируем действия
export const {
  addReminder,
  editReminder,
  deleteReminder,
  toggleComplete,
  setState,
  setFilterStatus,
} = remindersSlice.actions;

export default remindersSlice.reducer;

export const selectFilteredReminders = (state: { reminders: RemindersState }) => {
  const { reminders, filterStatus } = state.reminders;
  return reminders.filter((reminder) =>
    filterStatus === 'pending' ? !reminder.completed : reminder.completed,
  );
};
