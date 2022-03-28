import React from 'react';
import './style.sass';

export function Loader() {
  return (
    <div className='loader'>
      <img src="img/loading.gif" alt="loading..." />
    </div>
  );
}