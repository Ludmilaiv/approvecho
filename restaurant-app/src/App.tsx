import React from 'react';
import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from './components/footer';
import { GoHome } from './components/gohome';

function App () {
  return (
    <div className="App">
      <Header withBanner={true} />
      <Main />
      <Footer />
      <GoHome />
    </div>
  );
}

export default App;
