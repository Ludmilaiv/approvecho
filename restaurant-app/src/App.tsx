import React from 'react';
import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from './components/footer';

function App () {
  return (
    <div className="App">
      <Header withBanner={true} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
