import {removeNotifications} from "../../dispatch/notificationsDispatch";
import {removeStorageItem} from "../storage";

export const clearAllNotifications = () => {
    removeStorageItem('notifications');
    removeNotifications();
};