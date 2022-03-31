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

  useEffect(() => {
    setActiveCategory(categories ? categories[0] : undefined);
  }, [categories]);

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    getCategories();
    getMenu();
  }, [api]);

  return (
    <section className='admin-food-menu container' id="foodMenu">
      <h2 className='admin-main__subtitle'>Редактирование меню</h2>
      <div className='admin-food-menu__wrp'>
        <div className='admin-food-menu__categories'>
          <h2 className='admin-food-menu__title'>Категории <Modal trigger={<button className='admin-food-menu__add-btn'>+</button>} content={<AddCategory />}/></h2>
          <ul className='admin-food-menu__categories-list'>

            {!categoriesLoading && activeCategory ? categories?.map(category =>
              <li key={category.id} className={classNames('admin-food-menu__categories-item', activeCategory.id === category.id && 'admin-food-menu__categories-item_active')} onClick={() => setActiveCategory(category)}>
                {category.title}
                <div className='admin-food-menu__categories-item-btns'>
                  <Modal trigger={<button className='admin-food-menu__categories-item-btn'>&#10006;</button>} content={<RemoveCategory categoryId={category.id} categoryTitle={category.title} />}/>
                  <Modal trigger={<button className='admin-food-menu__categories-item-btn'>&#9998;</button>} content={<ChangeCategory categoryId={category.id} categoryTitle={category.title} />}/>
                </div>
              </li>
            ): <Loader/>}

          </ul>
        </div>
        <div className='admin-food-menu__category-wrp'>
          <h3 className='admin-food-menu__category-title'>{activeCategory?.title}<Modal trigger={<button className='admin-food-menu__add-btn'>+</button>} content={<AddMenuItem />}/></h3>
          <ul className='admin-food-menu__list'>
            {!menuLoading && activeCategory && !menu?.find(item => item.category_id === activeCategory.id)
              ? 'Категория пуста' : ''}
            {(!menuLoading && activeCategory) ? menu?.map(item => 
              item.category_id === activeCategory.id && <li key={item.id} className='admin-food-menu__item'>
                <div>
                  <div className='admin-food-menu__item-btns'>
                    <Modal trigger={<button className='admin-food-menu__item-btn'>&#10006;</button>} content={<RemoveMenuItem menuItemId={item.id} menuItemTitle={item.title} />}/>
                    <Modal trigger={<button className='admin-food-menu__item-btn'>&#9998;</button>} content={<ChangeMenuItem menuItemId={item.id} menuItemTitle={item.title} />}/>
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
                  <span className='admin-food-menu__item-massa'>324гр</span>
                  <span className='admin-food-menu__item-price'>100 ₽</span>
                </div>
              </li>
            ) : <Loader/>}
          </ul>
        </div>
      </div>
    </section>
  );
}