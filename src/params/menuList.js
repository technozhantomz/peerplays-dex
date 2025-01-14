import React from 'react';
import {
    IconAssets,
    IconBlockchain,
    IconBookOpen,
    IconDashboard,
    IconExchange, 
    IconSettings,
    IconVoting
} from "../svg/index";

export const menuList = [
    {
        link: '/',
        tag: 'dashboard',
        icon: <IconDashboard />,
    },
    {
        link: '/exchange',
        tag: 'exchange',
        icon: <IconExchange />,
    },
    {
        link: '/assets',
        tag: 'assets',
        icon: <IconAssets />,
    },
    {
        link: '/blockchain',
        tag: 'blockchain',
        icon: <IconBlockchain />,
    },
    {
        link: '/voting',
        tag: 'voting',
        icon: <IconVoting />,
    },
    {
        link: '/settings',
        tag: 'settings',
        icon: <IconSettings />,
    },
    {
        link: '/bitcoin',
        tag: 'bitcoin',
        icon: <IconBookOpen/>,
    },
    {
        link: '/hive',
        tag: 'hive',
        icon: <IconBookOpen/>,
    }
];
