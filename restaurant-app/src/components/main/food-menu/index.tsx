import classNames from 'classnames';
import React, {useState} from 'react';
import './style.sass';

const categories = [
  {id: 1, title: 'Салаты'},
  {id: 2, title: 'Винная карта'},
  {id: 3, title: 'Закуски'},
  {id: 5, title: 'Супы'},
  {id: 6, title: 'Десерты'},
  {id: 7, title: 'Напитки'},
];

const menu = [
  {id: 1, category: 1, title: 'Цезарь', img: 'cezar.jpg', desc: '(Филе кур, бекон, черри, яйцо перепелиное, руккола, Mozzarella, cоус Итальянский)', massa: 324, unit: 'гр',  price: 100},
  {id: 2, category: 1, title: 'Антонио', img: 'antonio.jpg', desc: '(Филе куриное, черри, бруснично-грушевый соус, сладкий перец, Mozzarella)', massa: 324, unit: 'гр', price: 100},
  {id: 3, category: 1, title: 'Греческий', img: 'grecheskiy.jpg', desc: '(Филе куриное, черри, бруснично-грушевый соус, сладкий перец, Mozzarella)', massa: 324, unit: 'гр', price: 100},
  {id: 4, category: 1, title: 'Цезарь', img: 'cezar.jpg', desc: '(Филе кур, бекон, черри, яйцо перепелиное,руккола, Mozzarella, cоус Итальянский)', massa: 324, unit: 'гр', price: 100},
  {id: 5, category: 1, title: 'Антонио', img: 'antonio.jpg', desc: '(Филе куриное, черри, бруснично-грушевый соус, сладкий перец, Mozzarella)', massa: 324, unit: 'гр', price: 100},
  {id: 6, category: 1, title: 'Греческий', img: 'grecheskiy.jpg', desc: '(Филе куриное, черри, бруснично-грушевый соус, сладкий перец, Mozzarella)', massa: 324, unit: 'гр', price: 100},
];

// const getCategories = () => {

// }


export function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section className='food-menu container' id="foodMenu">
      <div className='food-menu__categories'>
        <h2 className='food-menu__title'>Меню</h2>
        <ul className='food-menu__categories-list'>

          {categories.map(category =>
            <li key={category.id} className={classNames('food-menu__categories-item', activeCategory.id === category.id && 'food-menu__categories-item_active')} onClick={() => setActiveCategory(category)}>
              {category.title}
            </li>
          )}

        </ul>
      </div>
      <div className='food-menu__category-wrp'>
        <h3 className='food-menu__category-title'>Салаты</h3>
        <ul className='food-menu__list'>

          {menu.map(item => 
            item.category === activeCategory.id && <li key={item.id} className='food-menu__item'>
              <div>
                <div className='food-menu__item-img-box'>
                  <img className='food-menu__item-img' src={`menu_img/${item.img}`} alt="photo" />
                </div>
                <h4 className='food-menu__item-title'>{item.title}</h4>
                <p className='food-menu__item-desc'>
                  {item.desc}
                </p>
              </div>
              <div className='food-menu__item-footer'>
                <span className='food-menu__item-massa'>324гр</span>
                <span className='food-menu__item-price'>100 ₽</span>
              </div>
            </li>
          )}

        </ul>
      </div>
      
    </section>
  );
}