import {editStorage, getStorage} from "../storage";
import {setNotifications} from "../../dispatch/notificationsDispatch";

export const nullifyUnreadNotifications = () => {
    const notifications = getStorage('notifications');

    if(!notifications.unread) return;

    notifications.unread = 0;

    editStorage('notifications', {unread: 0});
    setNotifications(notifications);
};