import React from 'react';
import resetStyle from '@/styles/resetStyle';
import { Global } from '@emotion/react';

function App() {
  return (
    <div className='App'>
      <Global styles={resetStyle} />
      <p>Hello Netmarble</p>
    </div>
  );
}

export default App;
