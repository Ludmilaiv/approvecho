import React from 'react';
import './style.sass';

export function Contacts() {
  return (
    <section className='contacts' id='contacts'>
      <h2 className='visually-hidden'>Контакты</h2>
      <div className='contacts__container container'>
        <ul className='contacts__list'>
          <li className='contacts__item'>
            <img className='contacts__item-img' src='img/location.svg' />
            <span className='contacts__item-lbl'>ул. Карла Маркса, 78</span>
          </li>
          <li className='contacts__item'>
            <img className='contacts__item-img' src='img/clock-dark.svg' />
            <span className='contacts__item-lbl'>
              Работаем для вас каждый день <br/>с 10:00 до 19:00
            </span>
          </li>
          <li className='contacts__item'>
            <img className='contacts__item-img' src='img/phone.svg' />
            <span className='contacts__item-lbl'>+ 7 987 654-32-10</span>
          </li>
          <li className='contacts__item'>
            <img className='contacts__item-img' src='img/letter.svg' />
            <a href='mailto:info@gmail.com' className='contacts__item-lbl contacts__item-link'>info@gmail.com</a>
          </li>
        </ul>
      </div>
      <iframe className='contacts__map' src='https://yandex.ru/map-widget/v1/?um=constructor%3A54351f9c0350e9f0ac06ee1b94c5e26556f8a4cc8e6aa35da907fb450e4bb148&amp;source=constructor' width='836' height='457' frameBorder='0'></iframe>
    </section>
  );
}