import React from 'react';
import { Booking } from './booking';

export function Main() {
  return (
    <div>
      <Booking />
      <Booking classMod="light"/>
    </div>
  );
}