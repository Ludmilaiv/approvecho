import React, { Dispatch, useState } from 'react';
import { Category } from '../../../../../../../../../types';
import { Methods } from '../../../../../../../../../methods';
import classNames from 'classnames';

type props = {
  api: string | undefined; 
  categories: Category[] | undefined;
  setCategories: Dispatch<React.SetStateAction<Category[] | undefined>>; 
}

export const AddCategory = ({api, categories, setCategories}: props) => {
  const [title, setTitle] = useState<string>('');
  const [errorTitle, setErrorTitle] = useState<string>();
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    const closeTrigger = document.querySelector('.modal .close') as HTMLElement | undefined;
    if (!closeTrigger) return;
    closeTrigger.click();
  };

  const addCategory = async() => {
    if (!api || !title) return;
    setLoading(true);
    const newCategory = await Methods.addCategory(api, title).then();
    if (!newCategory) {
      setError('Ошибка на сервере');
      setLoading(false);
      return;
    }
    if (!categories) categories = [];
    setCategories([...categories, newCategory]);
    setLoading(false);
    setDone(true);
  };

  const form = <form action='#' onSubmit={e => {
    e.preventDefault();
    if (!title || title === '') {
      setErrorTitle('Заполните название категории');
    } else {
      addCategory();
    }
  }}>
    <label htmlFor='title'>Название категории</label>
    <input value={title} className={classNames('modal__input', errorTitle && 'modal__input_err')}  type='text' name='title' id='title' placeholder='Введите название новой категории' onInput={e => {
      if (errorTitle) setErrorTitle(undefined);
      if (error) setError(undefined);
      setTitle((e.target as HTMLInputElement).value);
    }}/>
    <div className='modal__error'>{errorTitle ?? error}</div>
    <div className='modal__buttons'>
      <button disabled={loading} type='submit' className='ui-button ui-button-light'>
        Создать
        {loading && <div className='ui-button__loading'><img src='/img/loading.gif' alt='loading' /></div>}
      </button>
      <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Отменить</button>
    </div>
  </form>;

  const doneContent = <div>
    <p>{`Категория "${title}" успешно добавлена.`}</p>
    <p>Хотите добавить ещё категорию?</p>
    <div className='modal__buttons'>
      <button type='submit' className='ui-button ui-button-light' onClick={() => {
        setTitle('');
        setError(undefined);
        setDone(false);
      }} >Да</button>
      <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Нет</button>
    </div>
  </div>;

  return (
    <div>
      <h2 className='modal__header'>Добавление категории</h2>
      <div className='modal__content'>
        {done ? doneContent : form}
      </div> 
    </div>
  );
};