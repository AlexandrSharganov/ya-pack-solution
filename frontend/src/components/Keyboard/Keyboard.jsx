import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Keyboard.module.css';
import BigButton from '../BigButton/BigButton';

function Keyboard() {
  const [inputValue, setInputValue] = useState('');

  const {
    register,
    formState: { errors, isValid },
    // getValues,
    reset,
  } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  // onAddProduct({
  //   product: getValues('product'),
  // });

  const handleButtonClick = (digit) => {
    setInputValue((prevValue) => prevValue + digit);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <form className={styles.container}>
      <h1 className={styles.title}>Введите штрихкод товара</h1>
      <label htmlFor="number">
        <input
          name="number"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.inputField}
          placeholder="Номер штрихкода"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('product', {
            required: 'Заполните это поле.',
            minLength: {
              value: 16,
              message: 'Должно быть 16 цифр.',
            },
            maxLength: {
              value: 16,
              message: 'Должно быть 16 цифр.',
            },
          })}
        />
        <span className={(styles.inputError, styles.inputErrorActive)}>
          {errors?.product &&
            (errors?.product?.message || 'Введите номер штрихкода')}
        </span>
      </label>
      <BigButton
        isValid={isValid}
        buttonText="Готово"
        // onClick={handleBigButtonClick}
      />
      <div className={styles.keyboardRow}>
        <button
          type="button"
          onClick={() => handleButtonClick('7')}
          className={styles.button}
        >
          7
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
          onClick={() => handleButtonClick('9')}
          className={styles.button}
        >
          9
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick('4')}
          className={styles.button}
        >
          4
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
          onClick={() => handleButtonClick('6')}
          className={styles.button}
        >
          6
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick('1')}
          className={styles.button}
        >
          1
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
          onClick={() => handleButtonClick('3')}
          className={styles.button}
        >
          3
        </button>
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
    </form>
  );
}

export default Keyboard;
