import classNames from 'classnames';
import React, {useState, useEffect} from 'react';
import './style.sass';
import { Methods } from '../../../../../../../methods';
import { Category, FoodMenuItem } from '../../../../../../../types';
import { Loader } from '../../../../../../loader';
import { Modal } from '../modal';
import { AddCategory } from './components/add-category';
import { ChangeCategory } from './components/change-category';
import { RemoveCategory } from './components/remove-category';
import { AddMenuItem } from './components/add-menu-item';
import { ChangeMenuItem } from './components/change-menu-item';
import { RemoveMenuItem } from './components/remove-menu-item';

export function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>();
  const [menu, setMenu] = useState<FoodMenuItem[]>();
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);
  const [api, setApi] = useState<string>();
  const [removedCategory, setRemovedCategory] = useState<number>();
  const [removedMenuItem, setRemovedMenuItem] = useState<number>();
  const [categoryMenu, setCategoryMenu] = useState<FoodMenuItem[]>();

  const getApi = async() => {
    const api = await Methods.getApi().then();
    setApi(api);
  };

  const getCategories = async() => {
    if (!api) return;
    const categories = await Methods.getCategories(api).then();
    setCategories(categories);
    setCategoriesLoading(false);
  };
  
  const getMenu = async() => {
    if (!api) return;
    const menu = await Methods.getMenu(api).then();
    setMenu(menu);
    setMenuLoading(false);
  };

  const moveCategoryUp = async (id: number) => {
    if (!categories || !api) return;
    const cat = categories.find(elem => elem.id === id);
    if (!cat) return;
    const index = categories.indexOf(cat);
    if (index === 0) return;
    const order = cat.order_index;
    cat.order_index = categories[index - 1].order_index;
    categories[index - 1].order_index = order;
    await Methods.moveCategory(api, cat.id, categories[index - 1].id);
    setCategories([...categories.sort((prev, next) => prev.order_index - next.order_index)]);
  };

  const moveCategoryDown = async (id: number) => {
    if (!categories || !api) return;
    const cat = categories.find(elem => elem.id === id);
    if (!cat) return;
    const index = categories.indexOf(cat);
    if (index === categories.length) return;
    const order = cat.order_index;
    cat.order_index = categories[index + 1].order_index;
    categories[index + 1].order_index = order;
    await Methods.moveCategory(api, cat.id, categories[index + 1].id);
    setCategories([...categories.sort((prev, next) => prev.order_index - next.order_index)]);
  };

  const moveMenuItemLeft = async (id: number) => {
    if (!categoryMenu || !menu || !api) return;
    const mItem = categoryMenu.find(elem => elem.id === id);
    if (!mItem) return;
    const index = categoryMenu.indexOf(mItem);
    if (index === 0) return;
    const order = mItem.order_index;
    mItem.order_index = categoryMenu[index - 1].order_index;
    categoryMenu[index - 1].order_index = order;
    await Methods.moveMenuItem(api, mItem.id, categoryMenu[index - 1].id);
    setMenu([...menu.sort((prev, next) => next.order_index - prev.order_index)]);
  };

  const moveMenuItemRight = async (id: number) => {
    if (!categoryMenu || !menu || !api) return;
    const mItem = categoryMenu.find(elem => elem.id === id);
    if (!mItem) return;
    const index = categoryMenu.indexOf(mItem);
    if (index === categoryMenu.length - 1) return;
    const order = mItem.order_index;
    mItem.order_index = categoryMenu[index + 1].order_index;
    categoryMenu[index + 1].order_index = order;
    await Methods.moveMenuItem(api, mItem.id, categoryMenu[index + 1].id);
    setMenu([...menu.sort((prev, next) => next.order_index - prev.order_index)]);
  };

  useEffect(() => {
    if (!activeCategory) return;
    setCategoryMenu(menu?.filter(elem => +elem.category_id === +activeCategory.id));
  }, [activeCategory, menu]);

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    // Если страницу только открыли или удалили активную категорию, то активной делаем первую категорию
    if (!activeCategory || !categories?.find(elem => +elem.id === +activeCategory.id)) setActiveCategory(categories ? categories[0] : undefined);
  }, [categories]);

  useEffect(() => {
    getCategories();
    getMenu();
  }, [api]);

  return (
    <section className='admin-food-menu container' id="foodMenu">
      <h2 className='admin-main__subtitle'>Редактирование меню</h2>
      <div className='admin-food-menu__wrp'>
        <div className='admin-food-menu__categories'>
          <h2 className='admin-food-menu__title'>Категории <Modal trigger={<button className='admin-food-menu__add-btn'>+</button>} content={<AddCategory api={api} categories={categories} setCategories={setCategories} />}/></h2>
          <ul className='admin-food-menu__categories-list'>

            {!categoriesLoading && activeCategory ? categories?.map((category, index) =>
              <li key={category.id} className={classNames('admin-food-menu__categories-item', activeCategory.id === category.id && 'admin-food-menu__categories-item_active', removedCategory && +removedCategory === +category.id && 'display-none')} onClick={e => !(e.target as HTMLElement).closest('.admin-food-menu__categories-item-move-btns') && setActiveCategory(category)}>
                <div className={classNames('admin-food-menu__categories-item-move-btns', index == 0 && 'admin-food-menu__categories-item-move-btns_first', index == categories.length - 1 && 'admin-food-menu__categories-item-move-btns_last')}>
                  {index !== 0 && <button className='admin-food-menu__categories-item-btn' onClick={() => moveCategoryUp(category.id)}>&#9650;</button>}
                  {index !== categories.length - 1 && <button className='admin-food-menu__categories-item-btn' onClick={() => moveCategoryDown(category.id)}>&#9660;</button>}
                </div>
                {category.title}
                <div className='admin-food-menu__categories-item-btns'>
                  <Modal trigger={<button className='admin-food-menu__categories-item-btn'>&#10006;</button>} content={<RemoveCategory api={api} category={category} categories={categories} setCategories={setCategories} setRemoved={setRemovedCategory}/>}/>
                  <Modal trigger={<button className='admin-food-menu__categories-item-btn'>&#9998;</button>} content={<ChangeCategory api={api} category={category} categories={categories} setCategories={setCategories}/>}/>    
                </div>
              </li>
            ): <Loader/>}

          </ul>
        </div>
        <div className='admin-food-menu__category-wrp'>
          <h3 className='admin-food-menu__category-title'>{activeCategory?.title}<Modal trigger={<button className='admin-food-menu__add-btn'>+</button>} content={<AddMenuItem api={api} setMenu={setMenu} menu={menu} categories={categories} categoryId={activeCategory && activeCategory.id}/>}/></h3>
          <ul className='admin-food-menu__list'>
            {!menuLoading && activeCategory && (!categoryMenu || categoryMenu.length === 0) ? 'Категория пуста' : ''}
            {(!menuLoading && activeCategory) ? categoryMenu?.map((item, index) => 
              <li key={item.id} className={classNames('admin-food-menu__item', removedMenuItem && +removedMenuItem === +item.id && 'display-none')}>
                <div>
                  <div className='admin-food-menu__item-btns'>
                    <div className='admin-food-menu__item-btns-wrp'>
                      <Modal trigger={<button className='admin-food-menu__item-btn'>&#10006;</button>} content={<RemoveMenuItem api={api} menuItem={item} menu={menu} setMenu={setMenu} setRemoved={setRemovedMenuItem} />}/>
                      <Modal trigger={<button className='admin-food-menu__item-btn'>&#9998;</button>} content={<ChangeMenuItem categories={categories} api={api} menuItem={item} menu={menu} setMenu={setMenu} />}/>
                    </div>
                    <div className='admin-food-menu__item-btns-wrp'>
                      {index !== 0 && <button className='admin-food-menu__item-btn' onClick={() => moveMenuItemLeft(item.id)}>&#9204;</button>}
                      {index !== categoryMenu.length - 1 && <button className='admin-food-menu__item-btn' onClick={() => moveMenuItemRight(item.id)}>&#9205;</button>}            
                    </div>
                  </div>
                  <div className='admin-food-menu__item-img-box'>
                    <img className='admin-food-menu__item-img' src={`${api}img/menu/${item.img}`} alt="photo" />
                  </div>
                  <h4 className='admin-food-menu__item-title'>{item.title}</h4>
                  <p className='admin-food-menu__item-desc'>
                    {item.desc}
                  </p>
                </div>
                <div className='admin-food-menu__item-footer'>
                  <span className='admin-food-menu__item-massa'>{item.massa} {item.unit}</span>
                  <span className='admin-food-menu__item-price'>{item.price} ₽</span>
                </div>
              </li>
            ) : <Loader/>}
          </ul>
        </div>
      </div>
    </section>
  );
}