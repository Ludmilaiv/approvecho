import React from 'react';
import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from '../../footer';

export function AdminPanel() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}