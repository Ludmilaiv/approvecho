import React from 'react';
import './style.sass';
import {AuthorForm} from './components/author-form';

type props = {blocked?: boolean, setAuth: React.Dispatch<React.SetStateAction<boolean>>}

export function Main({blocked = true, setAuth}: props) {
  return (
    <main className='admin-main container'>
      <h1 className='admin-main__title'>Панель администратора</h1>
      {blocked && <AuthorForm setAuth={setAuth} />}
    </main>
  );
}