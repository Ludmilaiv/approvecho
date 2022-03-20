import React from 'react';
import { Booking } from './booking';
import { Contacts } from './contacts';

export function Main() {
  return (
    <div>
      <Booking />
      <Contacts />
      <Booking classMod="light"/>
    </div>
  );
}