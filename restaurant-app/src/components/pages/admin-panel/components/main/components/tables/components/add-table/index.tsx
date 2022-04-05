import React, { Dispatch, useState } from 'react';
import { Table } from '../../../../../../../../../types';
import { Methods } from '../../../../../../../../../methods';
import classNames from 'classnames';

type props = {
  api: string | undefined; 
  tables: Table[] | undefined;
  setTables: Dispatch<React.SetStateAction<Table[] | undefined>>; 
}

export const AddTable = ({api, tables, setTables}: props) => {
  const [title, setTitle] = useState<string>('');
  const [places, setPlaces] = useState<string>('');
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorPlaces, setErrorPlaces] = useState<string>();
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    const closeTrigger = document.querySelector('.modal .close') as HTMLElement | undefined;
    if (!closeTrigger) return;
    closeTrigger.click();
  };

  const addTable = async() => {
    if (!api || !title || !places) return;
    setLoading(true);
    const newTable = await Methods.addTable(api, title, +places).then();
    if (!newTable) {
      setError('Ошибка на сервере');
      setLoading(false);
      return;
    }
    if (!tables) tables = [];
    setTables([...tables, newTable]);
    setLoading(false);
    setDone(true);
  };

  const form = <form action='#' onSubmit={e => {
    e.preventDefault();
    if (!title || title === '') {
      setErrorTitle('Заполните название категории');
    }
    addTable();
  }}>
    <label htmlFor='title'>Название стола</label>
    <input value={title} className={classNames('modal__input', errorTitle && 'modal__input_err')}  type='text' name='title' id='title' placeholder='Например, "Столик №3"' onInput={e => {
      if (errorTitle) setErrorTitle(undefined);
      if (error) setError(undefined);
      setTitle((e.target as HTMLInputElement).value);
    }}/>
    <label htmlFor='places'>Количество мест за столом</label>
    <input value={places} className={classNames('modal__input', errorPlaces && 'modal__input_err')}  type='number' name='places' id='places' placeholder='0' onInput={e => {
      if (errorPlaces) setErrorPlaces(undefined);
      if (error) setError(undefined);
      setPlaces((e.target as HTMLInputElement).value);
    }}/>
    <div className='modal__error'>{error}</div>
    <div className='modal__buttons'>
      <button disabled={loading} type='submit' className='ui-button ui-button-light'>
        Создать
        {loading && <div className='ui-button__loading'><img src='/img/loading.gif' alt='loading' /></div>}
      </button>
      <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Отменить</button>
    </div>
  </form>;

  const doneContent = <div>
    <p>{`Стол "${title}" успешно добавлен.`}</p>
    <p>Хотите добавить ещё стол?</p>
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
      <h2 className='modal__header'>Добавление стола</h2>
      <div className='modal__content'>
        {done ? doneContent : form}
      </div> 
    </div>
  );
};