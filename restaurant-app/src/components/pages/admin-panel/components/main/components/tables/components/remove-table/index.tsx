import React, { Dispatch, useState } from 'react';
import { Table } from '../../../../../../../../../types';
import { Methods } from '../../../../../../../../../methods';

type props = {
  api: string | undefined; 
  table: Table;
  tables: Table[] | undefined;
  setTables: Dispatch<React.SetStateAction<Table[] | undefined>>; 
  setRemoved: Dispatch<React.SetStateAction<number | undefined>>; 
}

export const RemoveTable = ({api, table, tables, setTables, setRemoved}: props) => {
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    const closeTrigger = document.querySelector('.modal .close') as HTMLElement | undefined;
    if (!closeTrigger) return;
    closeTrigger.click();
  };

  const removeTable= async() => {
    if (!api || !tables) return;
    setLoading(true);
    const newTable = await Methods.removeTable(api, table.id, setError).then();
    if (!newTable) {
      setLoading(false);
      return;
    }
    setRemoved(newTable.id);
    setLoading(false);
    setDone(true);
  };

  const form = <form action='#' onSubmit={e => {
    e.preventDefault();
    removeTable();
  }}>
    <p>{`Вы уверены, что хотите удалить стол "${table.title}"?`} </p>
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
    <p>{`Стол "${table.title}" успешно удалён.`}</p>
    <div className='modal__buttons'>
      <button type='button' className='ui-button ui-button-contrast' onClick={() => {
        closeModal();
        if (!tables) return;
        setTables(tables.filter(elem => {
          if (+elem.id === +table.id) {
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