import styles from './Pages.module.css';
import BeforeScanning from '../components/BeforeScanning/BeforeScanning';
import AfterScanning from '../components/AfterScanning/AfterScanning';

function MainPage({ onPackageEntry }) {
  return (
    <section className={styles.main}>
      <BeforeScanning />
      <AfterScanning onPackageEntry={onPackageEntry} />
    </section>
  );
}

export default MainPage;
