import './style.sass';
import React, {useState, useEffect} from 'react';
import { Methods } from '../../../../../../../methods';
import { Book, Table } from '../../../../../../../types';
import { Loader } from '../../../../../../loader';
import { Modal } from '../../../../../../modal';
import { RemoveBook } from './components/remove-book';
import { RecoveryBook } from './components/recovery-book';
import { ConfirmBook } from './components/confirm-book';


const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const dateFormat = (dateTime: number): string => {
  const date = new Date(dateTime);
  const day = date.getDate();
  const mon = month[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();

  return `${day} ${mon} ${year}г. ${Math.round(hour / 10) === 0 ? 0 :''}${hour}:${Math.round(min / 10) === 0 ? 0 : ''}${min}`;
};

export function Orders() {
  const [booking, setBooking] = useState<Book[]>();
  const [tables, setTables] = useState<Table[]>();
  const [bookingFiltered, setBookingFiltered] = useState<Book[]>();
  const [bookingLoading, setBookingLoading] = useState(true);
  const [tablesLoading, setTablesLoading] = useState(true);
  const [api, setApi] = useState<string>();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [confirmed, setConfirmed] = useState(true);
  const [notConfirmed, setNotConfirmed] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [oneDay, setOneDay] = useState(true);

  const getApi = async() => {
    const api = await Methods.getApi().then();
    setApi(api);
  };
  
  const getBooking = async() => {
    if (!api) return;
    let start: number | undefined;
    let end: number | undefined;
    if (startDate && endDate && startDate !== '' && endDate !== '') {
      start = (new Date(startDate)).getTime();
      end = (new Date(endDate)).getTime();
    }
    const booking = await Methods.getBooking(api, start, end).then();
    setBooking(booking);
    setBookingLoading(false);
  };

  const getTables = async() => {
    if (!api) return;
    const tables = await Methods.getTables(api).then();
    setTables(tables);
    setTablesLoading(false);
  };

  const getDate = () => {
    const date = Methods.getDate(3);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setStartDate(`${year}-${Math.round(month / 10) === 0 ? 0 : ''}${month}-${Math.round(day / 10) === 0 ? 0 : ''}${day}`);
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    if (oneDay) {
      setEndDate(startDate);
    }
  }, [startDate, oneDay]);

  useEffect(() => {
    getTables();
    getBooking();
    getDate();
  }, [api]);

  useEffect(() => {
    getBooking();
  }, [startDate, endDate]);

  useEffect(() => {
    if (!booking) {
      setBookingFiltered(undefined);
      return;
    }
    setBookingFiltered(booking.filter(book => (
      confirmed && book.confirmed && +book.confirmed !== 0 && (!book.removed || +book.removed === 0)) || 
      (notConfirmed && (!book.confirmed || +book.confirmed === 0) && (!book.removed || +book.removed === 0)) || 
      (removed && book.removed && +book.removed !== 0)));
  }, [booking, confirmed, notConfirmed, removed]);

  return (
    <section className='orders container' id="foodMenu">
      <h2 className='admin-main__subtitle'>Просмотр заказов</h2>
      <form action="#" className='orders__form' onSubmit={e =>e.preventDefault()}>
        <div className='orders__form-wrp'>
          <label className='orders__label' htmlFor='start_date'><span>Показать с</span>
            <input value={startDate} className='orders__input' type='date' id='start_date' 
              onChange={e => setStartDate((e.target as HTMLInputElement).value)}/>
          </label>
          
          <label className='orders__label' htmlFor='end_date'> <span>по</span> 
            <input value={endDate} className='orders__input' type='date' id='end_date' disabled={oneDay} 
              onChange={e => setEndDate((e.target as HTMLInputElement).value)}/>
          </label>
          
          <label className='orders__label' htmlFor="one_day"><span>Один день</span> 
            <input checked={oneDay} className='orders__input' type="checkbox" id='one_day' onChange={e => setOneDay((e.target as HTMLInputElement).checked)}/>
          </label>
        </div>

        <div className='orders__form-wrp'>
          <label className='orders__label' htmlFor="confirmed"><span>Подтверждённые</span> 
            <input checked={confirmed} className='orders__input' type="checkbox" id='confirmed' onChange={e => setConfirmed((e.target as HTMLInputElement).checked)}/>
          </label>
          <label className='orders__label' htmlFor="not_confirmed"><span>Не подтверждённые</span> 
            <input checked={notConfirmed} className='orders__input' type="checkbox" id='not_confirmed' onChange={e => setNotConfirmed((e.target as HTMLInputElement).checked)}/>
          </label>
          <label className='orders__label' htmlFor="removed"><span>Отменённые</span> 
            <input checked={removed} className='orders__input' type="checkbox" id='removed' onChange={e => setRemoved((e.target as HTMLInputElement).checked)}/>
          </label>
        </div>
        
      </form>
      <ul className='orders__list'>
        {!bookingLoading && !tablesLoading && (!bookingFiltered || bookingFiltered.length === 0) && 'Заказов нет'}
        {bookingLoading || tablesLoading ? <Loader /> : bookingFiltered?.map(book => <li key={book.id} className='orders__item'>
          <div>
            <div className='orders__item-header'>{!book.removed || +book.removed === 0 ? !book.confirmed || +book.confirmed === 0 ? <span className='orders__span orders__span_danger'>Не подтверждён</span> : <span className='orders__span orders__span_good'>Подтверждён</span> : <span className='orders__span orders__span_danger'>Отменён</span>}</div>
            <div className='orders__item-row orders__item-name'>{book.first_name} {book.last_name}</div>
            <div className='orders__item-row'>{dateFormat(+book.datetime)}</div>
            <div className='orders__item-row'>{tables?.find(table => +table.id === +book.table_id)?.title}</div>
            <div className='orders__row'>{book.phone}</div>
          </div>

          <div className='orders__item-footer'>
            {!book.removed || +book.removed === 0 ? <div className='orders__buttons'>

              <Modal trigger={<button className='ui-button ui-button-contrast'>Отменить</button>} content={<RemoveBook api={api} book={book} booking={booking} setBooking={setBooking}/>}/>

              {!book.confirmed || +book.confirmed === 0 ? 
                <Modal trigger={<button className='ui-button ui-button-light'>Подтвердить</button>} content={<ConfirmBook api={api} book={book} booking={booking} setBooking={setBooking}/>}/> 
                : '' } </div>: <div className='orders__buttons'>

              <Modal trigger={<button className='ui-button ui-button-contrast'>Восстановить</button>} content={<RecoveryBook api={api} book={book} booking={booking} setBooking={setBooking}/>}/>

            </div>}
          </div>
        </li>)}
      </ul>
    </section>
  );
}