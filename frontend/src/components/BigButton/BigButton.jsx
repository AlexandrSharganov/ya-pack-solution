import Loader from '../Loader/Loader';
import styles from './BigButton.module.css';

function BigButton({ buttonText, onClick, isValid, isLoading }) {
  return (
    <button
      type="submit"
      className={`${styles.button} ${isValid ? '' : styles.buttonInactive}`}
      onClick={onClick}
    >
      {isLoading ? <Loader /> : buttonText}
    </button>
  );
}

export default BigButton;
