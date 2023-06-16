import styles from './EnterKeyboardButton.module.css';
import Keyboard from '../../images/keyboard.svg';

function EnterKeyboardButton({ onProductEntry }) {
  const handleProductEntryClick = () => onProductEntry(true);
  return (
    <button
      type="button"
      className={styles.mainButton}
      onClick={handleProductEntryClick}
    >
      <img src={Keyboard} alt="Keyboard" />
      Ввести с клавиатуры
    </button>
  );
}

export default EnterKeyboardButton;
