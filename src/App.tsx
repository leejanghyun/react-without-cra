import React from 'react';
import resetStyle from '@/styles/resetStyle';
import { Global } from '@emotion/react';
import { Provider } from 'react-redux';
import store from '@/store';

function App() {
  return (
    <Provider store={store}>
      <Global styles={resetStyle} />
      <div className="App">
        <p>Hello Netmarble</p>
      </div>
    </Provider>
  );
}

export default App;
