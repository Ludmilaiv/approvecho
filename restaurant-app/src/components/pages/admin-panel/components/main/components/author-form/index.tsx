import React from 'react';
import './style.sass';

export function AuthorForm() {
  return (
    <form className='author-form' action='#'>
      <fieldset className='author-form__body'>
        <legend className='author-form__title'>Вход в панель администратора</legend>
        <input className='author-form__input' type="text" placeholder='Пароль администратора'/>
        <button type='submit' className='author-form__button ui-button ui-button-light'>Войти</button>
        <span className='author-form__span'>Если забыли пароль, обратитесь к веб-мастеру</span>
      </fieldset>
    </form>
  );
}