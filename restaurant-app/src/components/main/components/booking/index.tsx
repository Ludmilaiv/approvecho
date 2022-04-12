import React, { useState } from 'react';
import './style.sass';
import classNames from 'classnames';
import { Modal } from '../../../modal';
import { Tables } from './components/tables';
import { Methods } from '../../../../methods';

type Props = {classMod?: string};

export function Booking({ classMod = 'medium' } : Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [dateErr, setDateErr] = useState(false);
  const [timeErr, setTimeErr] = useState(false);
  const [durationErr, setDurationErr] = useState(false);
  const [err, setErr] = useState<string>();

  const isValid = () => {
    let valid = true;
    if (timeErr) valid = false;
    if (!firstName) {
      valid = false;
      setFirstNameErr(true);
    }
    if (!lastName) {
      valid = false;
      setLastNameErr(true);
    }
    if (!phone) {
      valid = false;
      setPhoneErr(true);
    }
    if (!date) {
      valid = false;
      setDateErr(true);
    }
    if (!time) {
      valid = false;
      setTimeErr(true);
    }     
    if (!valid) setErr('Заполните, пожалуйста, все поля');
    return valid;
  };

  return (
    <section id={classMod === 'medium' ? 'booking' : ''} className={classNames('booking', 'booking_' + classMod)}>
      <h2 className="visually-hidden">Забронировать стол</h2>
      <form className="booking__form" action="#" onSubmit={e => e.preventDefault()}>
        <fieldset>
          <legend className="booking__form-title">Забронировать стол</legend>
          <div className="booking__form-body">
            <div className="booking__form-column">
              <input value={firstName} className={classNames('booking__form-input', firstNameErr && 'booking__form-input_err')}  type="text" placeholder="Имя" onInput={e => {
                if (firstNameErr) setFirstNameErr(false);
                setFirstName((e.target as HTMLInputElement).value);
              }} required/>
              <input value={lastName} className={classNames('booking__form-input', lastNameErr && 'booking__form-input_err')} type="text" placeholder="Фамилия" onInput={e => {
                if (lastNameErr) setLastNameErr(false);
                setLastName((e.target as HTMLInputElement).value);
              }} required/>
              <input value={phone} className={classNames('booking__form-input', phoneErr && 'booking__form-input_err')} type="text" placeholder="Телефон" onInput={e => {
                if (phoneErr) setPhoneErr(false);
                const val = (e.target as HTMLInputElement).value;
                if (val.length <= 2) { 
                  setPhone('+7');
                  return;
                }
                if (!val.match(/^(\+7[0-9]{0,11})$/gi)) {
                  (e.target as HTMLInputElement).value = phone;
                  return;
                }
                if (val.length > 12) {
                  setPhone(val.slice(0,val.length - 1));
                  return;
                }
                setPhone(val);
              }} 
              required/>
            </div>
            <div className="booking__form-column">
              <input value={date} className={classNames('booking__form-input', 'booking__form-input_date', dateErr && 'booking__form-input_err')} id="date" type="text" placeholder="Дата" onFocus={(e) => {e.target.setAttribute('type', 'date');}} onInput={e => {
                if (dateErr) setDateErr(false);
                const val = (e.target as HTMLInputElement).value;
                const dateThis = new Date(val);
                const dateNow = Methods.getDate(3);
                if (dateThis.getTime() < dateNow.getTime() && 
                (dateThis.getFullYear() !== dateNow.getFullYear() || 
                dateThis.getMonth() !== dateNow.getMonth() || 
                dateThis.getDate() !== dateNow.getDate())) {
                  setDateErr(true);
                  setErr('Укажите корректную дату');
                }
                setDate(val);
              }} required/>
              <label htmlFor="date" className="booking__form-label"></label>
              <input value={time} className={classNames('booking__form-input', 'booking__form-input_time', timeErr && 'booking__form-input_err')} type="text" id="time" placeholder="Время" onFocus={(e) => {e.target.setAttribute('type', 'time');}} onInput={e => {
                if (timeErr) setTimeErr(false);
                const val = (e.target as HTMLInputElement).value;
                const timeSplit = val.split(':').map(el => +el);
                if (timeSplit[0] < 9 || timeSplit[0] > 22 || (timeSplit[0] === 21 && timeSplit[1] > 0)) {
                  setTimeErr(true);
                  setErr('Мы работаем с 9:00 до 23:00. Выберите, пожалуйста, время с 9:00 до 22:00.');
                } else if (date && !dateErr) {
                  const dateThis = new Date(`${date}T${val}`);
                  const dateNow = Methods.getDate(3);
                  if (dateThis < new Date(dateNow.getTime() + 60 * 60000)) {
                    setTimeErr(true);
                    setErr('Забронировать стол возможно не менее, чем за час до желаемого времени. Выберите, пожалуйста, другое время');
                  }
                }
                setTime(val);
              }} required/>
              <label htmlFor="time" className="booking__form-label"></label>

              <input value={duration} className={classNames('booking__form-input', 'booking__form-input_duration', durationErr && 'booking__form-input_err')} type="number" id="duration" placeholder="Длительность" onInput={e => {
                if (durationErr) setDurationErr(false);
                const val = +(e.target as HTMLInputElement).value;
                if (val < 0) {
                  (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value = String(-1 * val);
                }
                if (val == 0) {
                  (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value = '';
                }
                if (time && !timeErr) {
                  const timeSplit = time.split(':').map(el => +el);
                  if (timeSplit[0] + val > 23 || (timeSplit[0] + val === 23 && timeSplit[1] > 0)) {
                    setDurationErr(true);
                    setErr('Мы работаем до 23:00. Введите, пожалуйста, соответствующую длительность бронирования');
                  }
                } 
                setDuration((e.target as HTMLInputElement).value);
              }} required/>
              <label htmlFor="duration" className="booking__form-label"></label>
            </div>
          </div>
          <div className='booking__error'>{firstNameErr || lastNameErr || phoneErr || dateErr || timeErr || durationErr ? err : ''}</div>
          <Modal trigger={<button type="submit" className="booking__btn ui-button ui-button-light">Забронировать
            <img className="booking__btn-img" src="img/arrow.svg" />
          </button>} content={<Tables isValid={isValid} first_name={firstName} last_name={lastName} phone={phone} date={date} time={time} duration={duration}/>}/>
        </fieldset>
      </form>
    </section>
  );
}