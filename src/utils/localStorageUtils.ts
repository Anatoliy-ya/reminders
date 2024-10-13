import { OverdueRemindersState, RemindersState } from '../types/types';

// Функция для загрузки состояния напоминаний из localStorage
export const loadRemindersState = (): RemindersState | undefined => {
  const remindersState = localStorage.getItem('remindersState');
  return remindersState ? JSON.parse(remindersState) : undefined;
};

// Функция для сохранения состояния напоминаний в localStorage
export const saveRemindersState = (state: RemindersState) => {
  localStorage.setItem('remindersState', JSON.stringify(state));
};

// Функция для загрузки просроченных напоминаний из localStorage
export const saveOverdueRemindersState = (state: OverdueRemindersState) => {
  if (state && Array.isArray(state.overdueReminders)) {
    localStorage.setItem('overdueRemindersState', JSON.stringify(state));
  }
};

// Функция для загрузки состояния просроченных напоминаний из localStorage
export const loadOverdueRemindersState = (): OverdueRemindersState | undefined => {
  const overdueRemindersState = localStorage.getItem('overdueRemindersState');
  return overdueRemindersState ? JSON.parse(overdueRemindersState) : undefined;
};
