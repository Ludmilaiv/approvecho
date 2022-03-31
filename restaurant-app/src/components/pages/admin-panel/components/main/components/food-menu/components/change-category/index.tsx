import React from 'react';

type props = {categoryId: number; categoryTitle: string}

export const ChangeCategory = ({categoryId, categoryTitle}: props) => {
  return (
    <div>
      <h2 className='modal__header'>Редактирование категории {categoryTitle}</h2>
      <div className='modal__content'>Данная функция пока находится в разработке</div> 
    </div>
  );
};