import React from 'react';
import './style.sass';

export function Banner() {
  return (
    <div className="banner header__banner">
      <div className="container">
        <h2 className="banner__title">Мы точно знаем<br/> чего вы хотите!</h2>
        <a href='#foodMenu' className="banner__btn ui-button ui-button-contrast">Посмотреть меню</a>
        <a href='#booking' className="banner__btn ui-button ui-button-light">Забронировать
          <img className="banner__btn-img" src="img/arrow.svg" />
        </a>
        <ul className="banner__contacts">
          <li className="banner__contacts-item">
            <img className="banner__contacts-img" src="img/phone.svg" alt="phone" />
            <span>+ 7 987 654-32-10</span>
          </li>
          <li className="banner__contacts-item">
            <img className="banner__contacts-img" src="img/location.svg" alt="location" />
            <span>ул. Карла Маркса, 78</span>
          </li>
        </ul>
      </div>
      
    </div>
  );
}
