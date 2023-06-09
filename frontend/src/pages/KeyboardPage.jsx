import styles from './Pages.module.css';
import Keyboard from '../components/Keyboard/Keyboard';

function KeyboardPage() {
  return (
    <section className={`${styles.main} ${styles.keyboardPage}`}>
      <Keyboard />
    </section>
  );
}

export default KeyboardPage;
