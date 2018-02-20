import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import MemoryApp from './components/MemoryApp';

import store from './store';

import './index.css';

const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <Component />
            </AppContainer>
        </Provider>,
        document.getElementById('root'),
    );
};

render(MemoryApp);

if (module.hot) {
    module.hot.accept('./components/MemoryApp', () => render(MemoryApp));
}
