import styles from './Pages.module.css';
import Keyboard from '../components/Keyboard/Keyboard';

function NumbersPage() {
  return (
    <section className={styles.main}>
      <Keyboard />
    </section>
  );
}

export default NumbersPage;
