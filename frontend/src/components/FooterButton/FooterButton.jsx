import styles from './FooterButton.module.css';
import Keyboard from '../../images/keyboard.svg';

function FooterButton() {
  return (
    <button type="button" className={styles.mainButton}>
      <img src={Keyboard} alt="Keyboard" />
      Ввести с клавиатуры
    </button>
  );
}

export default FooterButton;
