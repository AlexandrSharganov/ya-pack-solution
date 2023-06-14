import styles from './Pages.module.css';
import BeforeScanning from '../components/BeforeScanning/BeforeScanning';
import AfterScanning from '../components/AfterScanning/AfterScanning';

function MainPage({ scanNotRecommendedPackage, scanProduct, order }) {
  return (
    <section className={styles.main}>
      <BeforeScanning order={order} scanProduct={scanProduct} />
      <AfterScanning
        order={order}
        scanProduct={scanProduct}
        scanNotRecommendedPackage={scanNotRecommendedPackage}
      />
    </section>
  );
}

export default MainPage;
