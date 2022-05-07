import React from "react";
import {dbApi} from "../actions/nodes";
import {subscribeEvents} from "../actions/subscribeEvents";

export const setInstance = node => dispatch => {
    dispatch({type: 'SET_INSTANCE', payload: node});
    dbApi('set_subscribe_callback', [subscribeEvents, false]);
};