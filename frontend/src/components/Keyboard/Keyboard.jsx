import React, { useState, useEffect } from 'react';
import Popup from '../Popup/Popup';
import styles from './Keyboard.module.css';
import BigButton from '../BigButton/BigButton';
import deleteIcon from '../../images/delete.svg';

function Keyboard({ isOpen, onClose, onScanProduct, isLoading }) {
  const [inputValue, setInputValue] = useState('');
  const [noBarcodeError, setNoBarcodeError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setInputValue('');
    setIsValid(false);
    setShowError(false);
  }, []);

  const handleButtonClick = (digit) => {
    const newValue = inputValue + digit;
    setInputValue(newValue);
    setIsValid(newValue.length === 13);
    setShowError(true);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value.length <= 13) {
      setInputValue(value.toUpperCase());
      setShowError(true);
      setIsValid(value.length === 13);
    }
  };

  const handleClearInput = () => {
    setInputValue('');
    setShowError(true);
    setIsValid(false);
  };

  const handleDeleteLastCharacter = () => {
    const newValue = inputValue.slice(0, -1);
    setInputValue(newValue);
    setShowError(true);
    setIsValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length >= 3 && inputValue.length <= 13) {
      onScanProduct(inputValue);

      setTimeout(() => {
        setNoBarcodeError(
          'Упс, неверный штрихкод. Проверьте данные и попробуйте ещё раз.'
        );
      }, 100);
    }
  };

  useEffect(() => {
    setInputValue('');
    setIsValid(false);
    setShowError(false);
    setNoBarcodeError('');
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Введите штрихкод</h1>
        <button
          className={styles.close}
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        >
          ✕
        </button>
        <label htmlFor="barcode" className={styles.label}>
          <input
            id="barcode"
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
            {noBarcodeError}
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
        <BigButton
          isValid={isValid}
          isLoading={isLoading}
          buttonText="Готово"
        />
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
            ✕
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

export default Keyboard;
