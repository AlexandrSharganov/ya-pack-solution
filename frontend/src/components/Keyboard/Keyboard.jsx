// import { useState, useEffect } from 'react';
// import Popup from '../Popup/Popup';
// import styles from './Keyboard.module.css';
// import BigButton from '../BigButton/BigButton';
// import deleteIcon from '../../images/delete.svg';

// function Keyboard({ isOpen, onClose }) {
//   const [inputValue, setInputValue] = useState('');
//   const [isValid, setIsValid] = useState(false);
//   const [showError, setShowError] = useState(false);

//   const handleButtonClick = (digit) => {
//     setInputValue((prevValue) => prevValue + digit);
//     if (inputValue.length === 15) {
//       setIsValid(true);
//       setShowError(false);
//     } else {
//       setIsValid(false);
//       setShowError(true);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { value } = event.target;
//     setInputValue(value);
//     setShowError(true);
//     setIsValid(false);
//     if (inputValue.length === 15) {
//       setIsValid(true);
//       setShowError(false);
//     }
//   };

//   const handleClearInput = () => {
//     setInputValue('');
//     setShowError(false);
//   };

//   const handleDeleteLastCharacter = () => {
//     setInputValue((prevValue) => prevValue.slice(0, -1));
//     setShowError(true);
//     setIsValid(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputValue.length === 16) {
//       console.log('data');
//     } else {
//       console.log(`Введено ${inputValue.length} цифр вместо 16.`);
//     }
//   };

//   useEffect(() => {
//     setInputValue('');
//     setIsValid(false);
//     setShowError(false);
//   }, []);

//   return (
//     <Popup isOpen={isOpen} onClose={onClose}>
//       <form className={styles.container} onSubmit={handleSubmit}>
//         <h1 className={styles.title}>Введите штрихкод товара</h1>
//         <button
//           className={styles.close}
//           aria-label="Закрыть"
//           type="button"
//           onClick={onClose}
//         >
//           &#10005;
//         </button>
//         <label htmlFor="barcode">
//           <input
//             name="barcode"
//             type="number"
//             value={inputValue}
//             onChange={handleInputChange}
//             className={styles.inputField}
//             placeholder="Номер штрихкода"
//           />
//           <span
//             className={`${styles.inputError} ${showError ? styles.inputErrorActive : ''
//               }`}
//           >
//             {!isValid &&
//               showError &&
//               `Введено ${inputValue.length} цифр из 16.`}
//           </span>
//         </label>
//         <BigButton
//           isValid={isValid}
//           buttonText="Готово"
//           onClick={handleSubmit}
//         />
//         <div className={styles.keyboardRow}>
//           {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((digit) => (
//             <button
//               key={digit}
//               type="button"
//               onClick={() => handleButtonClick(String(digit))}
//               className={styles.button}
//               disabled={inputValue.length >= 16}
//             >
//               {digit}
//             </button>
//           ))}
//           <button
//             type="button"
//             onClick={handleClearInput}
//             className={styles.button}
//           >
//             &#10005;
//           </button>
//           <button
//             type="button"
//             onClick={() => handleButtonClick('0')}
//             className={styles.button}
//             disabled={inputValue.length >= 16}
//           >
//             0
//           </button>
//           <button
//             type="button"
//             onClick={handleDeleteLastCharacter}
//             className={styles.button}
//           >
//             <img
//               src={deleteIcon}
//               alt="Delete Icon"
//               className={styles.deleteIcon}
//             />
//           </button>
//         </div>
//       </form>
//     </Popup>
//   );
// }

// export default Keyboard;

import React, { useState, useEffect } from 'react';
import Popup from '../Popup/Popup';
import styles from './Keyboard.module.css';
import BigButton from '../BigButton/BigButton';
import deleteIcon from '../../images/delete.svg';

function Keyboard({ isOpen, onClose, onScanProduct, isLoading }) {
  const [inputValue, setInputValue] = useState(() => '');
  const [noBarcodeError, setNoBarcodeError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setInputValue('');
    setIsValid(false);
    setShowError(false);
  }, []);

  const handleButtonClick = (digit) => {
    setInputValue((prevValue) => {
      const newValue = prevValue + digit;
      setIsValid(newValue.length >= 3 && newValue.length <= 13);
      setShowError(true);
      return newValue;
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value.toUpperCase());
    setShowError(true);
    setIsValid(value.length >= 3 && value.length <= 13);
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
    if (inputValue.length >= 3 && inputValue.length <= 13) {
      onScanProduct(inputValue);

      setTimeout(() => {
        setNoBarcodeError('Данный штрихкод или упаковка не найдены в заказе.');
      }, 100);
    } else {
      console.log(`Введено ${inputValue.length} цифр из 13.`);
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
            name="barcode"
            type="text"
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
            {!isValid && showError && 'Неправильное количество символов.'}
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
