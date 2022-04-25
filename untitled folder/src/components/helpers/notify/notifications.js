import React from "react";
import Dropdown from "../form/dropdown";
import NotificationsBody from "./notificationsBody";
import NotificationsBtn from "./notificationsBtn";
import {nullifyUnreadNotifications} from "../../../actions/notifications";

const Notifications = () => (
    <Dropdown
        btn={<NotificationsBtn />}
        body={<NotificationsBody />}
        openCallback={nullifyUnreadNotifications}
        className="header__notifications"
        position="bottom-right"
    />
);

export default Notifications;