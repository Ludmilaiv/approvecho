import React from 'react';
import './style.sass';
import { AuthorForm } from './components/author-form';
import { FoodMenu } from './components/food-menu';
import { Orders } from './components/orders';
import { Tables } from './components/tables';

type props = {blocked?: boolean; activeTab: string; setAuth: React.Dispatch<React.SetStateAction<boolean>>}

export function Main({activeTab, blocked = true, setAuth}: props) {
  return (
    <main className='admin-main container'>
      <h1 className='admin-main__title'>Панель администратора</h1>
      {blocked && <AuthorForm setAuth={setAuth} />}
      {!blocked && activeTab === 'menu' && <FoodMenu />}
      {!blocked && activeTab === 'tables' && <Tables />}
      {!blocked && activeTab === 'orders' && <Orders />}
    </main>
  );
}