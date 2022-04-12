import React, { useState, useEffect } from 'react';
import { Table, Book } from '../../../../../../types';
import { Methods } from '../../../../../../methods';
import { Loader } from '../../../../../loader';
import classNames from 'classnames';

type props = {
  first_name: string | undefined;
  last_name: string | undefined;
  phone: string | undefined;
  date: string | undefined;
  time: string | undefined;
  duration: string | undefined;
  isValid: () => boolean
}

const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export const Tables = ({first_name, last_name, phone, date, time, duration, isValid}: props) => {
  const [api, setApi] = useState<string>();
  const [tables, setTables] = useState<Table[]>();
  const [img, setImg] = useState<string>();
  const [tablesLoading, setTablesLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [activeTable, setActiveTable] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [confirm, setConfirm] = useState(false);
  const [book, setBook] = useState<Book>(); 
  const [done, setDone] = useState(false); 
  const [code, setCode] = useState('');

  const dateF = date ? new Date(date) : undefined;

  const closeModal = () => {
    const closeTrigger = document.querySelector('.modal .close') as HTMLElement | undefined;
    if (!closeTrigger) return;
    closeTrigger.click();
  };

  if (!isValid()) closeModal();

  const getApi = async() => {
    const api = await Methods.getApi().then();
    setApi(api);
  };

  const getTables = async() => {
    if (!api || !duration) return;
    const datetime = new Date(`${date}T${time}`);
    const tables = await Methods.getEmptyTables(api, datetime.getTime(), +duration).then();
    setTables(tables);
    setTablesLoading(false);
  };

  const getTablesMap = async() => {
    if (!api) return;
    const image = await Methods.getTablesMap(api).then();
    if (image) {
      setImg(image);
    } else {
      setImg(undefined);
    }
    setImgLoading(false);
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    if (!confirm) {
      getTables();
      getTablesMap();
    }
  }, [api]);

  useEffect(() => {
    if (activeTable || !tables || tables.length === 0) return;
    setActiveTable(String(tables[0].id));
  }, [tables]);

  const booking = async () => {
    if (!api || !first_name || !last_name || !phone || !duration || !activeTable) return;
    setError(undefined);
    setLoading(true);
    const datetime = new Date(`${date}T${time}`);
    const newBook = await Methods.booking(api, first_name, last_name, phone, datetime.getTime(), +duration, +activeTable, setError).then();
    if (newBook) {
      setBook(newBook);
      setConfirm(true);
    }
    setLoading(false);
  };

  const confirmBooking = async () => {
    if (!api || !book) return;
    setError(undefined);
    setLoading(true);
    if (code === '') {
      setError('Введите код');
      setLoading(false);
      return;
    }
    const doneConfirm = await Methods.confirmBooking(api, book.id, code, setError).then();
    if (doneConfirm) {
      setDone(true);
    }
    setLoading(false);
  };

  const selectTables = <div className='select-tables'>
    <label htmlFor='tables' className='modal__subtitle'>Выберите стол из списка<br/>
      <i className='modal__desc'>Если стола нет в списке, значит он уже занят на выбранное Вами время</i></label>
    {!tablesLoading ? <select value={activeTable} className='modal__input' name='tables' id='tables' 
      onChange={e => {
        setError(undefined);
        setActiveTable((e.target as HTMLSelectElement).value);
      }}>
      {tables && tables.map(table => <option key={table.id} value={table.id}>
        {table.title} {`(${table.places}-местный)`}
      </option>)}
    </select> : <Loader />}
  </div>;

  const bookingPannel = <div>
    <h2 className='modal__header'>Бронирование стола</h2>
    <div className='modal__content'>
      <p><b>{dateF?.getDate()} {month[dateF?.getMonth() ?? 0]} {dateF?.getFullYear()} г.</b>  в <b>{time}</b> на <b>{duration}ч.</b></p>
      {/* {done ? doneContent : form} */}
      {selectTables}
      <div className='modal__error'>{error}</div>
      <div className='modal__buttons'>
        <button disabled={loading} className='ui-button ui-button-light' onClick={booking}>
          Забронировать
          {loading && <div className='ui-button__loading'><img src='/img/loading.gif' alt='loading' /></div>}
        </button>
        <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Отменить</button>
      </div>
      <h2 className='modal__title'>Карта расположения столов</h2>
      {!imgLoading ? <img src={`${api}/img/table-maps/${img}`}/> : <Loader />}
    </div> 
  </div>;

  const confirmBookingPannel = <div>
    <h2 className='modal__header'>Подтверждение бронирования</h2>
    <div className='modal__content'>
      <p><b>{dateF?.getDate()} {month[dateF?.getMonth() ?? 0]} {dateF?.getFullYear()} г.</b>  в <b>{time}</b> на <b>{duration}ч.</b><br/>
        {tables?.find(el => book && +el.id === +book?.table_id)?.title} <i className='modal__desc'>{tables?.find(el => book && +el.id === +book?.table_id)?.places}-местный</i>
      </p>
      <div>Введите код, полученный на номер {phone}<br/>
        <i className='modal__desc'>Обычно код приходит в течение 1-5 минут</i>
      </div>
      <form action="#" onSubmit={e => {
        e.preventDefault;
        confirmBooking();
      }}>
        <input type="text" className={classNames('modal__input')} onInput={e => {
          setError(undefined);
          setCode((e.target as HTMLInputElement).value);
        }} />
        <div className='modal__error'>{error}</div>
        <div className='modal__buttons'>
          <button disabled={loading} type='submit' className='ui-button ui-button-light'>
          Подтвердить
            {loading && <div className='ui-button__loading'><img src='/img/loading.gif' alt='loading' /></div>}
          </button>
          <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Отменить</button>
        </div>
      </form>
    </div> 
  </div>;

  const donePannel = <div>
    <h2 className='modal__header'>Подтверждение бронирования</h2>
    <div className='modal__content'>
      <p><b>{dateF?.getDate()} {month[dateF?.getMonth() ?? 0]} {dateF?.getFullYear()} г.</b>  в <b>{time}</b> на <b>{duration}ч.</b><br/>
        {tables?.find(el => +el.id === +activeTable)?.title} <i className='modal__desc'>{tables?.find(el => +el.id === +activeTable)?.places}-местный</i>
      </p>
      Бронирование успешно подтверждено. Ждём Вас в указанное время.
      <div className='modal__buttons'>
        <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Закрыть</button>
      </div>
    </div>
  </div>;

  return (<>
    {done ? donePannel : confirm ? confirmBookingPannel : bookingPannel}
  </>
  );
};