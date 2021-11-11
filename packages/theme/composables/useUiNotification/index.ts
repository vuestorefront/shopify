import { computed, reactive } from '@nuxtjs/composition-api';

interface UiNotification {
  message: string;
  action: { text: string; onClick: (...args: any) => void };
  type: 'danger' | 'success' | 'info';
  icon: string;
  persist: boolean;
  id: symbol;
  dismiss: () => void;
}

interface Notifications {
  notifications: Array<UiNotification>;
}

const state = reactive<Notifications>({
  notifications: []
});
const maxVisibleNotifications = 1;
const timeToLive = 3000;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUiNotification = () => {
  const send = (notification: UiNotification) => {
    const id = Symbol('notification');

    const dismiss = () => {
      const index = state.notifications.findIndex(notification => notification.id === id);

      if (index !== -1) state.notifications.splice(index, 1);
    };

    const newNotification = {
      ...notification,
      id,
      dismiss
    };

    state.notifications.push(newNotification);
    if (state.notifications.length > maxVisibleNotifications) state.notifications.shift();

    if (!notification.persist) {
      setTimeout(dismiss, timeToLive);
    }
  };

  return {
    send,
    notifications: computed(() => state.notifications)
  };
};

export default useUiNotification;
