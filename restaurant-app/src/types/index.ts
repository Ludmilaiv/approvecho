export type Category = {id: number; title: string; order: number};
export type Unit = 'гр' | 'л' | 'шт';
export type FoodMenuItem = {id: number; category_id: number; title: string; img: string; desc: string; massa: number; unit: Unit;  price: number};