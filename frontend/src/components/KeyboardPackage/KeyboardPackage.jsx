import { useState, useEffect } from 'react';
import Popup from '../Popup/Popup';
import styles from '../Keyboard/Keyboard.module.css';
import BigButton from '../BigButton/BigButton';
import deleteIcon from '../../images/delete.svg';

function KeyboardPackage({ isOpen, onClose }) {
  const [inputValue, setInputValue] = useState(() => '');
  const [isValid, setIsValid] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleButtonClick = (digit) => {
    setInputValue((prevValue) => {
      const newValue = prevValue + digit;
      setIsValid(newValue.length === 13);
      setShowError(true);
      return newValue;
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    setShowError(true);
    setIsValid(value.length === 13);
  };

  const handleClearInput = () => {
    setInputValue('');
    setShowError(true);
    setIsValid(false);
  };

  const handleDeleteLastCharacter = () => {
    setInputValue((prevValue) => prevValue.slice(0, -1));
    setShowError(true);
    setIsValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length === 13) {
      console.log('data');
      onClose();
      setInputValue('');
    } else {
      console.log(`Введено ${inputValue.length} цифр из 13.`);
    }
  };

  useEffect(() => {
    setInputValue('');
    setIsValid(false);
    setShowError(false);
  }, []);

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Введите штрихкод упаковки</h1>
        <button
          className={styles.close}
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        >
          &#10005;
        </button>
        <label htmlFor="barcode" className={styles.label}>
          <input
            name="barcode"
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            className={styles.inputField}
            placeholder="Номер штрихкода"
          />
          <span
            className={`${styles.inputError} ${
              showError ? styles.inputErrorActive : ''
            }`}
          >
            {!isValid &&
              showError &&
              `Введено ${inputValue.length} цифр из 13.`}
          </span>
          <button
            type="button"
            onClick={handleDeleteLastCharacter}
            className={styles.deleteBtn}
          >
            <img
              src={deleteIcon}
              alt="Delete Icon"
              className={styles.deleteIcon}
            />
          </button>
        </label>
        <BigButton isValid={isValid} buttonText="Готово" />
        <div className={styles.keyboardRow}>
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleButtonClick(String(digit))}
              className={styles.button}
              disabled={inputValue.length >= 13}
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={handleClearInput}
            className={styles.button}
          >
            &#10005;
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick('0')}
            className={styles.button}
            disabled={inputValue.length >= 13}
          >
            0
          </button>
        </div>
      </form>
    </Popup>
  );
}

export default KeyboardPackage;
