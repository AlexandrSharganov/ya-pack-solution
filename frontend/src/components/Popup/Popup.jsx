/* eslint-disable consistent-return */
import { useEffect } from 'react';
import styles from './Popup.module.css';

function Popup({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    const handleOverlayClose = (evt) => {
      if (evt.target.classList.contains(styles.popupOpened)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('mousedown', handleOverlayClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
        document.removeEventListener('mousedown', handleOverlayClose);
      };
    }
  }, [isOpen, onClose]);

  return (
    <aside className={`${styles.popup} ${isOpen ? styles.popupOpened : ''}`}>
      {children}
    </aside>
  );
}

export default Popup;
