import React, { Dispatch, useState } from 'react';
import { Book } from '../../../../../../../../../types';
import { Methods } from '../../../../../../../../../methods';

type props = {
  api: string | undefined; 
  book: Book;
  booking: Book[] | undefined;
  setBooking: Dispatch<React.SetStateAction<Book[] | undefined>>; 
}

export const ConfirmBook = ({api, book, booking, setBooking}: props) => {
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    const closeTrigger = document.querySelector('.modal .close') as HTMLElement | undefined;
    if (!closeTrigger) return;
    closeTrigger.click();
  };

  const confirmBook = async() => {
    if (!api || !booking) return;
    setLoading(true);
    const newBook = await Methods.confirmBooking(api, book.id, book.code).then();
    if (!newBook) {
      setLoading(false);
      setError('Ошибка на сервере');
      return;
    } 
    setLoading(false);
    setDone(true);
  };

  const form = <form action='#' onSubmit={e => {
    e.preventDefault();
    confirmBook();
  }}>
    <p>{'Клиент не подтвердил этот заказ по коду из смс. Перед тем, как подтвердить заказ самостоятельно, позвоните клиенту, и уточните, является ли заказ актуальным.'}</p>
    <p>{'Подтвердить заказ?'}</p>
    <div className='modal__error'>{error}</div>
    <div className='modal__buttons'>
      <button disabled={loading} type='submit' className='ui-button ui-button-light'>
        Да
        {loading && <div className='ui-button__loading'><img src='/img/loading.gif' alt='loading' /></div>}
      </button>
      <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Нет</button>
    </div>
  </form>;

  const doneContent = <div>
    <p>{'Заказ успешно подтверждён'}</p>
    <div className='modal__buttons'>
      <button type='button' className='ui-button ui-button-contrast' onClick={() => {
        closeModal();
        if (!booking) return;
        setBooking(booking.map(elem => {
          if (+elem.id === +book.id) {
            elem.confirmed = true;
            return elem;
          } else {
            return elem;
          }
        }));
      }}>Закрыть</button>
    </div>
  </div>;

  return (
    <div>
      <h2 className='modal__header'>Подтверждение заказа</h2>
      <div className='modal__content'>
        {done ? doneContent : form}
      </div> 
    </div>
  );
};