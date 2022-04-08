import React from 'react';
import resetStyle from '@/styles/resetStyle';
import { Global } from '@emotion/react';
import { Provider } from 'react-redux';
import store from '@/store';
import httpClient from '@/api/index';

function App() {
  // const baseURL = 'https://www.anapioficeandfire.com';
  // const URL = '/api/characters';
  // httpClient
  //   .request({
  //     baseURL,
  //     url: URL,
  //     method: 'GET',
  //     skipAlert: true,
  //     params: {
  //       page: 1,
  //       pageSize: 10,
  //     },
  //   })
  //   .then((res) => console.log(res));

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
