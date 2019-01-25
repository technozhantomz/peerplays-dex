import reducers from "../../reducers/index";
import thunk from 'redux-thunk'
import {applyMiddleware, createStore, compose} from 'redux'
import {createLogger} from "redux-logger";
import {routerMiddleware} from "react-router-redux";

export const initStore = (history) => {
    const middleware = routerMiddleware(history);

    let store = createStore(
        reducers,
        {},
        compose(applyMiddleware(thunk, middleware))
    );

    if (process.env.NODE_ENV !== 'production') {
        const logger = createLogger({ predicate: (getState, action) => ![].includes(action.type) });

        store = createStore(
            reducers,
            {},
            compose(
                applyMiddleware(thunk, logger, middleware),
                window.devToolsExtension ? window.devToolsExtension() : f => f,
            ),
        )
    }

    if (module.hot) module.hot.accept(reducers, () => store.replaceReducer(reducers));

    return store;
};