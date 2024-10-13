export interface Reminder {
  id: string;
  description: string;
  completed: boolean;
  dueDate: string; // предполагаем, что у вас есть поле с датой выполнения
}

export interface RemindersState {
  reminders: Reminder[];
  filterStatus: 'pending' | 'completed';
}

export interface OverdueRemindersState {
  overdueReminders: Reminder[];
  showNotification: boolean;
}
