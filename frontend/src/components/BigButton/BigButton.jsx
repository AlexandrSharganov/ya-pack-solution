import styles from './BigButton.module.css';

function BigButton(props) {
  const { buttonText, onClick, isValid } = props;
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
