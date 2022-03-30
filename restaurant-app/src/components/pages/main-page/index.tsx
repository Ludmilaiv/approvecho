import React from 'react';
import { Header } from '../../header';
import { Main } from '../../main';
import { Footer } from '../../footer';
import { GoHome } from '../../gohome';

export function MainPage() {
  return (
    <div className="App">
      <Header withBanner={true} />
      <Main />
      <Footer />
      <GoHome />
    </div>
  );
}