import React from 'react';
import './style.sass';
import {AuthorForm} from './components/author-form';

export function Main() {
  return (
    <main className='admin-main container'>
      <h1 className='admin-main__title'>Панель администратора</h1>
      <AuthorForm />
    </main>
  );
}