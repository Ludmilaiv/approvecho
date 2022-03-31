import React from 'react';

type props = {menuItemId: number, menuItemTitle: string}

export const ChangeMenuItem = ({menuItemId, menuItemTitle}: props) => {
  return (
    <div>
      <h2 className='modal__header'>Редактирование блюда {menuItemTitle}</h2>
      <div className='modal__content'>Данная функция пока находится в разработке</div> 
    </div>
  );
};