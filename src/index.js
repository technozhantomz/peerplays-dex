import React from 'react'
import ReactDom from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {ConnectedRouter} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'
import {ChainConfig} from "bitsharesjs/node_modules/bitsharesjs-ws/cjs";

import './styles/styles.scss';
import {initLocale} from "./actions/locale";
import {initStore} from "./actions/store/initStore";
import {initDB} from "./actions/iDB";

import App from './App'
import {initSettings} from "./actions/settings";
import {initCache} from "./actions/cacheOps";
import {defaultChainParams, defaultNetwork, defaultToken} from "./params/networkParams";

const history = createHistory();
export const store = initStore(history);

ChainConfig.setPrefix(defaultToken);
ChainConfig.networks[defaultNetwork] = defaultChainParams;

initCache();
initSettings();
initLocale();
initDB();

const render = (Component) => {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Component history={history} />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root'),
    )
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        render(App)
    })
}
