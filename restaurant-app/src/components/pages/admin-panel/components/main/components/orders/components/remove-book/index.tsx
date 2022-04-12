import React, { Dispatch, useState } from 'react';
import { Book } from '../../../../../../../../../types';
import { Methods } from '../../../../../../../../../methods';

type props = {
  api: string | undefined; 
  book: Book;
  booking: Book[] | undefined;
  setBooking: Dispatch<React.SetStateAction<Book[] | undefined>>; 
}

export const RemoveBook = ({api, book, booking, setBooking}: props) => {
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    const closeTrigger = document.querySelector('.modal .close') as HTMLElement | undefined;
    if (!closeTrigger) return;
    closeTrigger.click();
  };

  const removeBook = async() => {
    if (!api || !booking) return;
    setLoading(true);
    const newBook = await Methods.removeBook(api, book.id).then();
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
    removeBook();
  }}>
    <p>{'Вы уверены, что хотите отменить заказ?'}</p>
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
    <p>{'Заказ успешно отменён'}</p>
    <div className='modal__buttons'>
      <button type='button' className='ui-button ui-button-contrast' onClick={() => {
        closeModal();
        if (!booking) return;
        setBooking(booking.map(elem => {
          if (+elem.id === +book.id) {
            elem.removed = true;
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
      <h2 className='modal__header'>Отмена заказа</h2>
      <div className='modal__content'>
        {done ? doneContent : form}
      </div> 
    </div>
  );
};