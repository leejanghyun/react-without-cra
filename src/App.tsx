import React from 'react';
import resetStyle from '@/styles/resetStyle';
import { Global } from '@emotion/react';
import { Provider } from 'react-redux';
import store from '@/store';
import httpClient from '@/api/index';
import SendBirdCall from 'sendbird-calls'; // [test]
import Routes from '@/routes';

function App() {
  return (
    <Provider store={store}>
      <Global styles={resetStyle} />
      <div className="App">
        <Routes />
      </div>
    </Provider>
  );
}
export default App;
