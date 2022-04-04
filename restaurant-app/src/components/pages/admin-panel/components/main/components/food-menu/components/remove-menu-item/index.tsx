import React, { Dispatch, useState } from 'react';
import { FoodMenuItem } from '../../../../../../../../../types';
import { Methods } from '../../../../../../../../../methods';

type props = {
  api: string | undefined; 
  menuItem: FoodMenuItem;
  menu: FoodMenuItem[] | undefined;
  setMenu: Dispatch<React.SetStateAction<FoodMenuItem[] | undefined>>; 
  setRemoved: Dispatch<React.SetStateAction<number | undefined>>; 
}

export const RemoveMenuItem = ({api, menuItem, menu, setMenu, setRemoved}: props) => {
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    const closeTrigger = document.querySelector('.modal .close') as HTMLElement | undefined;
    if (!closeTrigger) return;
    closeTrigger.click();
  };

  const removeCategory = async() => {
    if (!api || !menu) return;
    setLoading(true);
    const newMenuItem = await Methods.removeMenuItem(api, menuItem.id).then();
    if (!newMenuItem) {
      setError('Ошибка на сервере');
      setLoading(false);
      return;
    }
    setRemoved(newMenuItem.id);
    setLoading(false);
    setDone(true);
  };

  const form = <form action='#' onSubmit={e => {
    e.preventDefault();
    removeCategory();
  }}>
    <p>{`Вы уверены, что хотите удалить блюдо "${menuItem.title}"?`} </p>
    <div className='modal__error'>{error}</div>
    <div className='modal__buttons'>
      <button disabled={loading} type='submit' className='ui-button ui-button-light'>
        Да
        {loading && <div className='ui-button__loading'><img src='/img/loading.gif' alt='loading' /></div>}
      </button>
      <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Отменить</button>
    </div>
  </form>;

  const doneContent = <div>
    <p>{`Блюдо "${menuItem.title}" успешно удалено.`}</p>
    <div className='modal__buttons'>
      <button type='button' className='ui-button ui-button-contrast' onClick={() => {
        closeModal();
        if (!menu) return;
        setMenu(menu.filter(elem => {
          if (+elem.id === +menuItem.id) {
            return false;
          } else {
            return true;
          }
        }));
      }}>Закрыть</button>
    </div>
  </div>;

  return (
    <div>
      <h2 className='modal__header'>Удаление блюда</h2>
      <div className='modal__content'>
        {done ? doneContent : form}
      </div> 
    </div>
  );
};