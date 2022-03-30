import React from 'react';
import './style.sass';
import { Banner } from './components/banner';
import {info} from '../../data';

type Props = {withBanner: boolean};

const nav = <nav>
  <ul className='header__menu'>
    <li>
      <a href='#foodMenu' className='header__menu-item'>Меню</a>
    </li>
    <li>
      <a href='#contacts' className='header__menu-item'>Контакты</a>
    </li>
    <li>
      <a href='#booking' className='header__menu-item header__menu-item ui-button ui-button-light'>Забронировать</a>
    </li>
  </ul>
</nav>;

export function Header({ withBanner = false} : Props) {
  return (
    <header id="top" className='header'>
      <h1 className='visually-hidden'>{info.name}</h1>
      <div className='container header__container'>
        <div className='header__logo'><img src="logo.png" alt="logo" /></div>
        {nav}
      </div>
      {withBanner && (<Banner />)}
    </header>
  );
}
