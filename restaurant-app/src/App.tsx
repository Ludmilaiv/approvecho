import React from 'react';
import { Header } from './components/header';
import { Main } from './components/main';

function App () {
  return (
    <div className="App">
      <Header withBanner={true} />
      <Main />
    </div>
  );
}

export default App;
