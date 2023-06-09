import styles from './FooterButton.module.css';
import Keyboard from '../../images/keyboard.svg';

function FooterButton({ onProductEntry }) {
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

export default FooterButton;
