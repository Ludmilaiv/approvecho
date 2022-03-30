import React from 'react';
import './style.sass';

const navAdmin = <nav>
  <ul className='header__menu'>
    <li>
      <a href='#' className='header__menu-item'>Редактировать меню</a>
    </li>
    <li>
      <a href='#' className='header__menu-item'>Просмотр заказов</a>
    </li>
    <li>
      <a href='#booking' className='header__menu-item header__menu-item ui-button ui-button-light'>Выход</a>
    </li>
  </ul>
</nav>;

export function Header() {
  return (
    <header id="top" className='header'>
      <h1 className='visually-hidden'>Панель администратора</h1>
      <div className='container header__container'>
        <div className='header__logo'><img src="logo.png" alt="logo" /></div>
        {navAdmin}
      </div>
    </header>
  );
}
