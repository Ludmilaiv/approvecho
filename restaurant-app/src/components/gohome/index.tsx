import React from 'react';
import './style.sass';

export function GoHome() {
  return (
    <a href="#top" className='home'>
      <img src="img/gohome.svg" alt="home" />
    </a>
  );
}