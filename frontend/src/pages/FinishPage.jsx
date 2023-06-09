import styles from './Pages.module.css';
import Finish from '../components/Finish/Finish';
import BigButton from '../components/BigButton/BigButton';

function FinishPage() {
  return (
    <section className={styles.main}>
      <Finish />
      <BigButton buttonText="Готово" />
    </section>
  );
}

export default FinishPage;
