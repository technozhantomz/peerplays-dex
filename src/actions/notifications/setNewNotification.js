import {formDate} from "../formDate";
import {formTrxInfo} from "../dataFetching/historyCallbacks";
import {getStorage, setStorage} from "../storage";
import {dbApi} from "../nodes";
import {setNotifications} from "../../dispatch/notificationsDispatch";

export const setNewNotification = async (account, operation) => {
    const timestamp = await dbApi('get_block_header', [operation.block_num])
        .then(block => ({
            date: formDate(block.timestamp),
            time: formDate(block.timestamp, ['time'])
        }));

    const {type, data} = await formTrxInfo(account.id, operation, true);
    const newNotification = { timestamp, type, data };

    let notifications = getStorage('notifications');

    if(!notifications.list) notifications = { unread: 0, list: [] };

    notifications.list.unshift(newNotification);
    notifications.unread += 1;

    setStorage('notifications', notifications);
    setNotifications(notifications);
};