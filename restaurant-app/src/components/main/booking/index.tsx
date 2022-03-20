import React from 'react';
import './style.sass';
import classNames from 'classnames';

type Props = {classMod?: string};

export function Booking({ classMod = 'medium' } : Props) {
  return (
    <section className={classNames('booking', 'booking_' + classMod)}>
      <form className="booking__form" action="#">
        <fieldset>
          <legend className="booking__form-title">Забронировать стол</legend>
          <div className="booking__form-body">
            <div className="booking__form-column">
              <input className="booking__form-input" type="text" placeholder="Имя" required/>
              <input className="booking__form-input" type="text" placeholder="Фамилия" required/>
              <input className="booking__form-input" type="text" placeholder="Телефон" required/>
            </div>
            <div className="booking__form-column">
              <input className="booking__form-input booking__form-input_date" id="date" type="text" placeholder="Дата" onFocus={(e) => {e.target.setAttribute('type', 'date');}} required/>
              <label htmlFor="date" className="booking__form-label"></label>
              <input className="booking__form-input booking__form-input_time" type="text" id="time" placeholder="Время" onFocus={(e) => {e.target.setAttribute('type', 'time');}} required/>
              <label htmlFor="time" className="booking__form-label"></label>
            </div>
          </div>
          <button type="submit" className="booking__btn ui-button ui-button-light">Забронировать
            <img className="booking__btn-img" src="img/arrow.svg" />
          </button>
        </fieldset>
      </form>
    </section>
  );
}