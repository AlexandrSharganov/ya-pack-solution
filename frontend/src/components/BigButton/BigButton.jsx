// import { useState } from 'react';
import styles from './BigButton.module.css';

function BigButton(props) {
  const { buttonText, onClick } = props;
  return (
    <button type="submit" className={styles.button} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default BigButton;
