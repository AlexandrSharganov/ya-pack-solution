import { useState } from 'react';
import styles from './Keyboard.module.css';

function Keyboard() {
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (digit) => {
    setInputValue((prevValue) => prevValue + digit);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Введите штрихкод товара</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={styles.inputField}
      />
      <div className={styles.keyboardRow}>
        <button
          type="button"
          onClick={() => handleButtonClick('9')}
          className={styles.button}
        >
          9
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick('8')}
          className={styles.button}
        >
          8
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick('7')}
          className={styles.button}
        >
          7
        </button>
      </div>
      <div className={styles.keyboardRow}>
        <button
          type="button"
          onClick={() => handleButtonClick('6')}
          className={styles.button}
        >
          6
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick('5')}
          className={styles.button}
        >
          5
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick('4')}
          className={styles.button}
        >
          4
        </button>
      </div>
      <div className={styles.keyboardRow}>
        <button
          type="button"
          onClick={() => handleButtonClick('3')}
          className={styles.button}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick('2')}
          className={styles.button}
        >
          2
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick('1')}
          className={styles.button}
        >
          1
        </button>
      </div>
      <div className={styles.keyboardRow}>
        <button
          type="button"
          onClick={() => handleClearInput()}
          className={`${styles.button} ${styles.clearButton}`}
        >
          &#10005;
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick('0')}
          className={styles.button}
        >
          0
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
