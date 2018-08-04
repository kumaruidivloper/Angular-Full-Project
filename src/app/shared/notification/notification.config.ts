import { NotificationConfig } from 'ng2-notify-popup/utilities/NotificationConfig';

export const errorNotificationConfig: Partial<NotificationConfig> = {
  position: 'top',
  duration: 2500,
  type: 'error'
};

export const successNotificationConfig: Partial<NotificationConfig> = {
  position: 'top',
  duration: 2500,
  type: 'success'
};
