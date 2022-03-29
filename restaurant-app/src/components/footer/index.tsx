import React from 'react';
import './style.sass';
import { info } from '../../data';

export function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__wrp'>
        <nav className='footer__menu-wrp'>
          <ul className='footer__menu'>
            <li>
              <a href='#top' className='footer__menu-item'>Главная</a>
            </li>
            <li>
              <a href='#foodMenu' className='footer__menu-item'>Меню</a>
            </li>
            <li>
              <a href='#contacts' className='footer__menu-item'>Контакты</a>
            </li>
            <li>
              <a href='#booking' className='footer__menu-item'>Забронировать</a>
            </li>
          </ul>
        </nav>
        <div className='footer__contacts-wrp'>
          <h3 className='footer__contacts-title'>Контакты</h3>
          <ul className='footer__contacts-list'>
            <li className='footer__contacts-item'>
              <img className='footer__contacts-item-img' src='img/location-light.svg' />
              <span className='footer__contacts-item-lbl'>{info.address}</span>
            </li>
            <li className='footer__contacts-item'>
              <img className='footer__contacts-item-img' src='img/letter-light.svg' />
              <span className='footer__contacts-item-lbl'>{info.email}</span>
            </li>
            <li className='footer__contacts-item'>
              <img className='footer__contacts-item-img' src='img/phone-light.svg' />
              <span className='footer__contacts-item-lbl'>{info.phone}</span>
            </li>
          </ul>
        </div>
      </div>
      <ul className='footer__social'>
        <li>
          <a href={info.insta} target='_blank' rel="noreferrer" className='footer__social-item'>
            <img src='img/instagram.svg' alt='instagram' />
          </a>
        </li>
      </ul>
      <div className='footer__copyright'>Copyright ©2022 All rights reserved</div>
    </footer>
  );
}