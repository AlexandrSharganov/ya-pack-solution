import styles from './BigButton.module.css';

function BigButton({ buttonText, onClick, isValid }) {
  return (
    <button
      type="submit"
      className={`${styles.button} ${isValid ? '' : styles.buttonInactive}`}
      // className={styles.button}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export default BigButton;
