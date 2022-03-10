import React from 'react';
import './style.sass';
import { Banner } from './components/banner';

type Props = {withBanner: boolean};

export function Header({ withBanner = false } : Props) {
  return (
    <header className='header'>
      <h1 className='visually-hidden'>Аппровечо</h1>
      <div className='container header__container'>
        <div className='header__logo'><img src="logo.png" alt="logo" /></div>
        <nav>
          <ul className='header__menu'>
            <li className='header__menu-item'>
              <a href='#' className='header__menu-item'>Меню</a>
            </li>
            <li>
              <a href='#' className='header__menu-item'>Контакты</a>
            </li>
            <li>
              <a href='#' className='header__menu-item header__menu-item ui-button ui-button-light'>Забронировать</a>
            </li>
          </ul>
        </nav>
      </div>
      {withBanner && (<Banner />)}
    </header>
  );
}
