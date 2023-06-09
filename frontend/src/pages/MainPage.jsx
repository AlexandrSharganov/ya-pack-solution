import styles from './Pages.module.css';
import BeforeScanning from '../components/BeforeScanning/BeforeScanning';
import AfterScanning from '../components/AfterScanning/AfterScanning';

function MainPage() {
  return (
    <section className={styles.main}>
      <BeforeScanning />
      <AfterScanning />
    </section>
  );
}

export default MainPage;
