import React from 'react';
import './style.sass';

export function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__wrp'>
        <nav className='footer__menu-wrp'>
          <ul className='footer__menu'>
            <li>
              <a href='#' className='footer__menu-item'>Главная</a>
            </li>
            <li>
              <a href='#' className='footer__menu-item'>Меню</a>
            </li>
            <li>
              <a href='#' className='footer__menu-item'>Контакты</a>
            </li>
            <li>
              <a href='#' className='footer__menu-item'>Забронировать</a>
            </li>
          </ul>
        </nav>
        <div className='footer__contacts-wrp'>
          <h3 className='footer__contacts-title'>Контакты</h3>
          <ul className='footer__contacts-list'>
            <li className='footer__contacts-item'>
              <img className='footer__contacts-item-img' src='img/location-light.svg' />
              <span className='footer__contacts-item-lbl'>ул. Карла Маркса, 78</span>
            </li>
            <li className='footer__contacts-item'>
              <img className='footer__contacts-item-img' src='img/letter-light.svg' />
              <span className='footer__contacts-item-lbl'>info@gmail.com</span>
            </li>
            <li className='footer__contacts-item'>
              <img className='footer__contacts-item-img' src='img/phone-light.svg' />
              <span className='footer__contacts-item-lbl'>+ 7 987 654-32-10</span>
            </li>
          </ul>
        </div>
      </div>
      <ul className='footer__social'>
        <li>
          <a href='#' className='footer__social-item'>
            <img src='img/facebook.svg' alt='facebook' />
          </a>
        </li>
        <li>
          <a href='#' className='footer__social-item'>
            <img src='img/instagram.svg' alt='instagram' />
          </a>
        </li>
      </ul>
      <div className='footer__copyright'>Copyright ©2022 All rights reserved</div>
    </footer>
  );
}