import styles from './Pages.module.css';
import BeforeScanning from '../components/BeforeScanning/BeforeScanning';
import AfterScanning from '../components/AfterScanning/AfterScanning';

function MainPage({ onPackageEntry, scanProduct }) {
  return (
    <section className={styles.main}>
      <BeforeScanning scanProduct={scanProduct} />
      <AfterScanning
        scanProduct={scanProduct}
        onPackageEntry={onPackageEntry}
      />
    </section>
  );
}

export default MainPage;
