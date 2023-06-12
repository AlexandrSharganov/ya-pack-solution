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

function Keyboard({ isOpen, onClose }) {
  const [inputValue, setInputValue] = useState(() => '');
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

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Введите штрихкод товара</h1>
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

// ------------------------------react-hook-form---------------------

// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import styles from './Keyboard.module.css';
// import BigButton from '../BigButton/BigButton';

// function Keyboard() {
//   const [inputValue, setInputValue] = useState('');

//   const {
//     register,
//     formState: { errors, isValid },
//     reset,
//     trigger,
//   } = useForm({
//     mode: 'all',
//     criteriaMode: 'all',
//   });

//   const handleButtonClick = (digit) => {
//     setInputValue((prevValue) => prevValue + digit);
//     trigger('product');
//   };

//   const handleInputChange = (event) => {
//     const { value } = event.target;
//     setInputValue(value);
//     trigger('product');
//   };

//   const handleClearInput = () => {
//     setInputValue('');
//     trigger('product');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   useEffect(() => {
//     reset();
//   }, [reset]);

//   return (
//     <form className={styles.container} onSubmit={handleSubmit}>
//       <h1 className={styles.title}>Введите штрихкод товара</h1>
//       <label htmlFor="barcode">
//         <input
//           name="barcode"
//           type="number"
//           value={inputValue}
//           onChange={handleInputChange}
//           className={styles.inputField}
//           placeholder="Номер штрихкода"
//           {...register('product', {
//             minLength: {
//               value: 16,
//               message: `Введено ${inputValue.length + 1} цифр вместо 16.`,
//             },
//           })}
//         />
//         <span
//           className={`${styles.inputError} ${
//             !isValid && styles.inputErrorActive
//           }`}
//         >
//           {errors?.product?.message}
//         </span>
//       </label>
//       <BigButton isValid={isValid} buttonText="Готово" onClick={handleSubmit} />
//       <div className={styles.keyboardRow}>
//         {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((digit) => (
//           <button
//             key={digit}
//             type="button"
//             onClick={() => handleButtonClick(String(digit))}
//             className={styles.button}
//             disabled={inputValue.length >= 16}
//           >
//             {digit}
//           </button>
//         ))}
//         <button
//           type="button"
//           onClick={handleClearInput}
//           className={`${styles.button} ${styles.clearButton}`}
//         >
//           &#10005;
//         </button>
//         <button
//           type="button"
//           onClick={() => handleButtonClick('0')}
//           className={styles.button}
//           disabled={inputValue.length >= 16}
//         >
//           0
//         </button>
//       </div>
//     </form>
//   );
// }

// export default Keyboard;

// --------------------------БЕЗ ОТКЛЮЧЕНИЯ КНОПКИ И ВЫВОД ОШИБКИ ВАЛИДАЦИИ ПРИ НАЖАТИИ НА ГОТОВО--------

// import { useState, useEffect } from 'react';
// import styles from './Keyboard.module.css';
// import BigButton from '../BigButton/BigButton';

// function Keyboard() {
//   const [inputValue, setInputValue] = useState('');
//   const [isValid, setIsValid] = useState(false);
//   const [showError, setShowError] = useState(false);

//   const handleButtonClick = (digit) => {
//     setInputValue((prevValue) => prevValue + digit);
//   };

//   const handleInputChange = (event) => {
//     const { value } = event.target;
//     setInputValue(value);
//   };

//   const handleClearInput = () => {
//     setInputValue('');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputValue.length === 16) {
//       setIsValid(true);
//       setShowError(false);
//       console.log('data');
//     } else {
//       setIsValid(false);
//       setShowError(true);
//       console.log(`Введено ${inputValue.length} цифр вместо 16.`);
//     }
//   };

//   useEffect(() => {
//     setInputValue('');
//   }, []);

//   return (
//     <form className={styles.container} onSubmit={handleSubmit}>
//       <h1 className={styles.title}>Введите штрихкод товара</h1>
//       <label htmlFor="barcode">
//         <input
//           name="barcode"
//           type="number"
//           value={inputValue}
//           onChange={handleInputChange}
//           className={styles.inputField}
//           placeholder="Номер штрихкода"
//         />
//         <span
//           className={`${styles.inputError} ${
//             showError ? styles.inputErrorActive : ''
//           }`}
//         >
//           {!isValid && `Введено ${inputValue.length} цифр вместо 16.`}
//         </span>
//       </label>
//       <BigButton buttonText="Готово" onClick={handleSubmit} />
//       <div className={styles.keyboardRow}>
//         {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((digit) => (
//           <button
//             key={digit}
//             type="button"
//             onClick={() => handleButtonClick(String(digit))}
//             className={styles.button}
//             disabled={inputValue.length >= 16}
//           >
//             {digit}
//           </button>
//         ))}
//         <button
//           type="button"
//           onClick={handleClearInput}
//           className={`${styles.button} ${styles.clearButton}`}
//         >
//           &#10005;
//         </button>
//         <button
//           type="button"
//           onClick={() => handleButtonClick('0')}
//           className={styles.button}
//           disabled={inputValue.length >= 16}
//         >
//           0
//         </button>
//       </div>
//     </form>
//   );
// }

// export default Keyboard;

// --------------------------БЕЗ ВИРТУАЛЬНОЙ КЛАВИАТУРЫ------------------------------------

// import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import styles from './Keyboard.module.css';
// import BigButton from '../BigButton/BigButton';

// function Keyboard() {
//   const {
//     register,
//     formState: { errors, isValid },
//     // getValues,
//     reset,
//   } = useForm({ mode: 'onChange', criteriaMode: 'all' });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   useEffect(() => {
//     reset();
//   }, [reset]);

//   return (
//     <form className={styles.container} onSubmit={handleSubmit}>
//       <h1 className={styles.title}>Введите штрихкод товара</h1>
//       <label htmlFor="number">
//         <input
//           name="number"
//           type="text"
//           className={styles.inputField}
//           placeholder="Номер штрихкода"
//             {...register('product', {
//             required: 'Заполните это поле.',
//             minLength: {
//               value: 16,
//               message: 'Введено меньше 16 цифр',
//             },
//             maxLength: {
//               value: 16,
//               message: 'Введено больше 16 цифр.',
//             },
//           })}
//         />
//         <span
//           className={`${styles.inputError} ${
//             !isValid && styles.inputErrorActive
//           }`}
//         >
//           {errors?.product?.message}
//         </span>
//       </label>
//       <BigButton isValid={isValid} buttonText="Готово" onClick={handleSubmit} />
//     </form>
//   );
// }

// export default Keyboard;
