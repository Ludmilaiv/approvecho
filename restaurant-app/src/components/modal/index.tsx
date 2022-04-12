import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './style.sass';

type props = {trigger: JSX.Element, content?: JSX.Element}

export const Modal = ({trigger, content=<span></span>} : props) => {
  return (
    <Popup trigger={trigger} modal>
      {(close: () => void ) => {
        return (
          <div className='modal'>
            <button className="close" onClick={close}>
              &times;
            </button>
            {content}
          </div>);
      }}
    </Popup>);
};