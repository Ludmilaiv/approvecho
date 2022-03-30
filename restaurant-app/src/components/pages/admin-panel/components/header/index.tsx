import React from 'react';
import './style.sass';

type props = {withMenu?: boolean; logOut: () => void}

export function Header({withMenu = false, logOut}: props) {

  const navAdmin = <nav>
    <ul className='header__menu'>
      <li>
        <a href='#' className='header__menu-item'>Редактировать меню</a>
      </li>
      <li>
        <a href='#' className='header__menu-item'>Просмотр заказов</a>
      </li>
      <li>
        <a href='#' className='header__menu-item header__menu-item ui-button ui-button-light' onClick={(e => {
          e.preventDefault();
          logOut();
        })}>Выход</a>
      </li>
    </ul>
  </nav>;

  return (
    <header id="top" className='header'>
      <h1 className='visually-hidden'>Панель администратора</h1>
      <div className='container header__container'>
        <div className='header__logo'><img src="logo.png" alt="logo" /></div>
        {withMenu && navAdmin}
      </div>
    </header>
  );
}
