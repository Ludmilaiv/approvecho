import React from 'react';
import { Booking } from './components/booking';
import { Contacts } from './components/contacts';
import { FoodMenu } from './components/food-menu';

export function Main() {
  return (
    <div>
      <Booking />
      <FoodMenu />
      <Contacts />
      <Booking classMod="light"/>
    </div>
  );
}