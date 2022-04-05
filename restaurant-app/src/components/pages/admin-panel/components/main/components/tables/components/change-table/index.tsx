import React, { Dispatch, useState } from 'react';
import { Table } from '../../../../../../../../../types';
import { Methods } from '../../../../../../../../../methods';
import classNames from 'classnames';

type props = {
  api: string | undefined; 
  table: Table;
  tables: Table[] | undefined;
  setTables: Dispatch<React.SetStateAction<Table[] | undefined>>; 
}

export const ChangeTable = ({api, table, tables, setTables}: props) => {
  const [title, setTitle] = useState<string>(table.title);
  const [places, setPlaces] = useState<string>(String(table.places));
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

  const changeTable = async() => {
    if (!api || !title || !places || !tables) return;
    setLoading(true);
    const newTable = await Methods.changeTable(api, table.id, title, +places).then();
    if (!newTable) {
      setError('Ошибка на сервере');
      setLoading(false);
      return;
    }
    setTables(tables.map(elem => {
      if (+elem.id === +table.id) {
        return newTable;
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
      setErrorTitle('Заполните название стола');
    }
    if (!places || places === '') {
      setErrorTitle('Заполните количество мест');
    }
    changeTable();
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
        Сохранить
        {loading && <div className='ui-button__loading'><img src='/img/loading.gif' alt='loading' /></div>}
      </button>
      <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Отменить</button>
    </div>
  </form>;

  const doneContent = <div>
    <p>{`Стол "${title}" успешно изменён.`}</p>
    <div className='modal__buttons'>
      <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Закрыть</button>
    </div>
  </div>;

  return (
    <div>
      <h2 className='modal__header'>Редактирование стола</h2>
      <div className='modal__content'>
        {done ? doneContent : form}
      </div> 
    </div>
  );
};