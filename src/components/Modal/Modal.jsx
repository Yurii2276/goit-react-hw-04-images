import { useEffect } from 'react';

import css from './Modal.module.css';

import React from 'react';

export default function Modal({ image, onRequestClose }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onRequestClose]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onRequestClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img className={css.modalImage} src={image} alt={image} />
      </div>
    </div>
  );
}
