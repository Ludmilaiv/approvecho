import React, { Dispatch, useState } from 'react';
import classNames from 'classnames';
import { Category, FoodMenuItem, Unit } from '../../../../../../../../../types';
import { Methods } from '../../../../../../../../../methods';
import { FileLoader } from '../file-loader';

type props = {
  api: string | undefined; 
  menu: FoodMenuItem[] | undefined;
  categories: Category[] | undefined;
  menuItem: FoodMenuItem;
  setMenu: Dispatch<React.SetStateAction<FoodMenuItem[] | undefined>>; 
}

export const ChangeMenuItem = ({api, categories, menuItem, menu, setMenu}: props) => {
  const [img, setImg] = useState<string | undefined>(menuItem.img);
  const [title, setTitle] = useState<string>(menuItem.title);
  const [category, setCategory] = useState<number>(menuItem.category_id);
  const [description, setDescription] = useState<string>(menuItem.desc);
  const [massa, setMassa] = useState<string>(String(menuItem.massa));
  const [unit, setUnit] = useState<Unit>(menuItem.unit);
  const [price, setPrice] = useState<string>(String(menuItem.price));
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorImg, setErrorImg] = useState<string>();
  const [errorDesc, setErrorDesc] = useState<string>();
  const [errorMassa, setErrorMassa] = useState<string>();
  const [errorPrice, setErrorPrice] = useState<string>();
  const [error, setError] = useState<string>();
  const [done, setDone] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    const closeTrigger = document.querySelector('.modal .close') as HTMLElement | undefined;
    if (!closeTrigger) return;
    closeTrigger.click();
  };

  const changeMenuItem = async() => {
    if (!api || !menu || !title || !description || !massa || !price || !img) return;
    setLoading(true);
    const newMenuItem = await Methods.changeMenuItem(api, menuItem.id, title, description, category, +massa, unit, +price, img).then();
    if (!newMenuItem) {
      setError('Ошибка на сервере');
      setLoading(false);
      return;
    }
    setMenu(menu.map(elem => {
      if (+elem.id === +newMenuItem.id) {
        return newMenuItem;
      } else {
        return elem;
      }
    }));
    setLoading(false);
    setDone(true);
  };

  const form = <form action='#' onSubmit={e => {
    e.preventDefault();
    if (!title || !description || !massa || !price || !img) {
      setError('Необходимо заполнить все поля');
      if (!title) {
        setErrorTitle('Введите наименование');
      }
      if (!description) {
        setErrorDesc('Введите описание');
      }
      if (!massa) {
        setErrorMassa('Введите объём, вес, либо количество');
      }
      if (!price) {
        setErrorPrice('Введите цену');
      }
      if (!img) {
        setErrorImg('Загрузите изображение');
      }
    } 
    changeMenuItem();
  }}>

    <label htmlFor='title'>Категория</label>
    <select value={category} className='modal__input' name='unit' onChange={e => {setCategory(+(e.target as HTMLSelectElement).value);}}>
      {categories?.map(cat => 
        <option key={cat.id} value={cat.id}>{cat.title}</option>
      )}
    </select>

    <label>Фото</label>
    <FileLoader error={!!errorImg} skipError={() => setErrorImg('')} api={api} img={img} setImg={setImg}/>
    <div className='modal__error'>{errorImg}</div>

    <label htmlFor='title'>Наименование</label>
    <input value={title} className={classNames('modal__input', errorTitle && 'modal__input_err')}  type='text' name='title' id='title' placeholder='Введите наименование блюда' onInput={e => {
      if (errorTitle) setErrorTitle(undefined);
      if (error) setError(undefined);
      setTitle((e.target as HTMLInputElement).value);
    }}/>

    <label htmlFor='desc'>Описание</label>
    <textarea value={description} className={classNames('modal__input', errorDesc && 'modal__input_err')} name='desc' id='desc' placeholder='Введите описание или состав блюда' onInput={e => {
      if (errorDesc) setErrorTitle(undefined);
      if (error) setError(undefined);
      setDescription((e.target as HTMLInputElement).value);
    }} />

    <label htmlFor='massa'>Вес, объём или количество</label>
    <div className='modal__input-wrp'>
      <input value={massa} className={classNames('modal__input', errorMassa && 'modal__input_err')}  type='number' name='massa' id='massa' placeholder='0' onInput={e => {
        if (errorMassa) setErrorMassa(undefined);
        if (error) setError(undefined);
        setMassa((e.target as HTMLInputElement).value);
      }}/>
      <select className='modal__input' value={unit} name='unit' onChange={e => {setUnit((e.target as HTMLSelectElement).value as Unit);}}>
        <option value='гр'>гр</option>
        <option value='л'>л</option>
        <option value='шт'>шт</option>
      </select>
    </div>

    <label htmlFor='price'>Цена (р)</label>
    <div className='modal__input-wrp'>
      <input value={price} className={classNames('modal__input', errorPrice && 'modal__input_err')}  type='number' name='price' id='price' placeholder='0' onInput={e => {
        if (errorPrice) setErrorPrice(undefined);
        if (error) setError(undefined);
        setPrice((e.target as HTMLInputElement).value);
      }}/>
    </div>
    

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
    <p>{`Блюдо "${title}" успешно изменено.`}</p>
    <div className='modal__buttons'>
      <button type='button' className='ui-button ui-button-contrast' onClick={closeModal}>Закрыть</button>
    </div>
  </div>;

  return (
    <div>
      <h2 className='modal__header'>Редактирование блюда</h2>
      <div className='modal__content'>
        {done ? doneContent : form}
      </div> 
    </div>
  );
};