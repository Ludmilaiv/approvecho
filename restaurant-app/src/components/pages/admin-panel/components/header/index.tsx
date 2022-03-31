import classNames from 'classnames';
import React from 'react';
import './style.sass';

type props = {withMenu?: boolean; activeTab: string; setActiveTab: React.Dispatch<React.SetStateAction<string>>; logOut: () => void}

export function Header({withMenu = false, activeTab, setActiveTab, logOut}: props) {

  const navAdmin = <nav>
    <ul className='header__menu'>
      <li>
        <a href='#' className={classNames('header__menu-item', activeTab === 'menu' && 'header__menu-item_active')} onClick={e => {
          e.preventDefault();
          setActiveTab('menu');
        }}>Редактировать меню</a>
      </li>
      <li>
        <a href='#' className={classNames('header__menu-item', activeTab === 'orders' && 'header__menu-item_active')} onClick={e => {
          e.preventDefault();
          setActiveTab('orders');
        }}>Просмотр заказов</a>
      </li>
      <li>
        <a href='#' className='header__menu-item header__menu-item ui-button ui-button-light' onClick={e => {
          e.preventDefault();
          logOut();
        }}>Выход</a>
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
