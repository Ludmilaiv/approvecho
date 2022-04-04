import React, { Dispatch, useState } from 'react';
import { Category } from '../../../../../../../../../types';
import { Methods } from '../../../../../../../../../methods';

type props = {
  api: string | undefined; 
  category: Category;
  categories: Category[] | undefined;
  setCategories: Dispatch<React.SetStateAction<Category[] | undefined>>; 
  setRemoved: Dispatch<React.SetStateAction<number | undefined>>; 
}

export const RemoveCategory = ({api, category, categories, setCategories, setRemoved}: props) => {
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    const closeTrigger = document.querySelector('.modal .close') as HTMLElement | undefined;
    if (!closeTrigger) return;
    closeTrigger.click();
  };

  const removeCategory = async() => {
    if (!api || !categories) return;
    setLoading(true);
    const newCategory = await Methods.removeCategory(api, category.id, setError).then();
    if (!newCategory) {
      setLoading(false);
      return;
    }
    setRemoved(newCategory.id);
    setLoading(false);
    setDone(true);
  };

  const form = <form action='#' onSubmit={e => {
    e.preventDefault();
    removeCategory();
  }}>
    <p>{`Вы уверены, что хотите удалить категорию "${category.title}"?`} </p>
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
    <p>{`Категория "${category.title}" успешно удалена.`}</p>
    <div className='modal__buttons'>
      <button type='button' className='ui-button ui-button-contrast' onClick={() => {
        closeModal();
        if (!categories) return;
        setCategories(categories.filter(elem => {
          if (+elem.id === +category.id) {
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
      <h2 className='modal__header'>Удаление категории</h2>
      <div className='modal__content'>
        {done ? doneContent : form}
      </div> 
    </div>
  );
};