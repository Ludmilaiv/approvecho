import React, { Dispatch, useState } from 'react';
import { Category } from '../../../../../../../../../types';
import { Methods } from '../../../../../../../../../methods';
import classNames from 'classnames';

type props = {
  api: string | undefined; 
  category: Category;
  categories: Category[] | undefined;
  setCategories: Dispatch<React.SetStateAction<Category[] | undefined>>; 
}

export const ChangeCategory = ({api, category, categories, setCategories}: props) => {
  const [title, setTitle] = useState<string>(category.title);
  const [errorTitle, setErrorTitle] = useState<string>();
  const [error, setError] = useState<string>();
  const [done, setDone] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    const closeTrigger = document.querySelector('.modal .close') as HTMLElement | undefined;
    if (!closeTrigger) return;
    closeTrigger.click();
  };

  const changeCategory = async() => {
    if (!api || !title || !categories) return;
    setLoading(true);
    const newCategory = await Methods.changeCategory(api, category.id, title);
    if (!newCategory) {
      setError('Ошибка на сервере');
      setLoading(false);
      return;
    }
    setCategories(categories.map(elem => {
      if (+elem.id === +category.id) {
        return newCategory;
      } else {
        return elem;
      }
    }));
    setLoading(false);
    setDone(true);
  };

  const form = <form action='#' onSubmit={e => {
    e.preventDefault();
    if (!title || title === '') {
      setErrorTitle('Заполните название категории');
    }
    changeCategory();
  }}>
    <label htmlFor='title'>Название категории</label>
    <input value={title} className={classNames('modal__input', errorTitle && 'modal__input_err')}  type='text' name='title' id='title' placeholder='Введите название категории' onInput={e => {
      if (errorTitle) setErrorTitle(undefined);
      if (error) setError(undefined);
      setTitle((e.target as HTMLInputElement).value);
    }}/>
    <div className='modal__error'>{errorTitle ?? error}</div>
    <div className='modal__buttons'>
      <button disabled={loading} type='submit' className='ui-button ui-button-light'>
        Сохранить
        {loading && <div className='ui-button__loading'><img src='/img/loading.gif' alt='loading' /></div>}
      </button>
      <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Отменить</button>
    </div>
  </form>;

  const doneContent = <div>
    <p>{`Категория "${title}" успешно изменена.`}</p>
    <div className='modal__buttons'>
      <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Закрыть</button>
    </div>
  </div>;

  return (
    <div>
      <h2 className='modal__header'>Редактирование категории</h2>
      <div className='modal__content'>
        {done ? doneContent : form}
      </div> 
    </div>
  );
};