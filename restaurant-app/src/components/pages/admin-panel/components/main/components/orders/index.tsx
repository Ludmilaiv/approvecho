//import classNames from 'classnames';
import React, {useState, useEffect} from 'react';

export function Orders() {
  // const [activeCategory, setActiveCategory] = useState<Category>();
  // const [categories, setCategories] = useState<Category[]>();
  // const [menu, setMenu] = useState<FoodMenuItem[]>();
  // const [categoriesLoading, setCategoriesLoading] = useState(true);
  // const [menuLoading, setMenuLoading] = useState(true);
  // const [api, setApi] = useState<string>();

  // const getApi = async() => {
  //   const api = await Methods.getApi().then();
  //   setApi(api);
  // };

  // const getCategories = async() => {
  //   if (!api) return;
  //   const categories = await Methods.getCategories(api).then();
  //   setCategories(categories);
  //   setCategoriesLoading(false);
  // };
  
  // const getMenu = async() => {
  //   if (!api) return;
  //   const menu = await Methods.getMenu(api).then();
  //   setMenu(menu);
  //   setMenuLoading(false);
  // };

  // useEffect(() => {
  //   setActiveCategory(categories ? categories[0] : undefined);
  // }, [categories]);

  // useEffect(() => {
  //   getApi();
  // }, []);

  // useEffect(() => {
  //   getCategories();
  //   getMenu();
  // }, [api]);

  return (
    <section className='orders container' id="foodMenu">
      <h2 className='admin-main__subtitle'>Просмотр заказов</h2>
      Страница находится в разработке
    </section>
  );
}