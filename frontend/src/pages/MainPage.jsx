import styles from './Pages.module.css';
import BeforeScanning from '../components/BeforeScanning/BeforeScanning';
import AfterScanning from '../components/AfterScanning/AfterScanning';

function MainPage() {
  const scannedItems = [];

  return (
    <section className={styles.main}>
      <BeforeScanning />
      <AfterScanning scannedItems={scannedItems} />
    </section>
  );
}

export default MainPage;
