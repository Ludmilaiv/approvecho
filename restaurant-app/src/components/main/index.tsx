import React from 'react';
import { Booking } from './booking';
import { Contacts } from './contacts';
import { FoodMenu } from './food-menu';

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