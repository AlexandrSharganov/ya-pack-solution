import React from 'react';
import styles from './Pages.module.css';
import BeforeScanning from '../components/BeforeScanning/BeforeScanning';
import AfterScanning from '../components/AfterScanning/AfterScanning';

function MainPage({
  scanRecommendedPackage,
  scanNotRecommendedPackage,
  scanProduct,
  setScanProduct,
  order,
  removeElement,
  setRemoveElement,
  isLoading,
}) {
  const hasBigButton = Boolean(
    scanRecommendedPackage.packagetype ||
      scanNotRecommendedPackage.packagetype ||
      removeElement
  );

  return (
    <section className={styles.main}>
      <BeforeScanning
        order={order}
        scanProduct={scanProduct}
        removeElement={removeElement}
        hasBigButton={hasBigButton}
      />
      <AfterScanning
        order={order}
        scanProduct={scanProduct}
        setScanProduct={setScanProduct}
        scanRecommendedPackage={scanRecommendedPackage}
        scanNotRecommendedPackage={scanNotRecommendedPackage}
        removeElement={removeElement}
        setRemoveElement={setRemoveElement}
        hasBigButton={hasBigButton}
        isLoading={isLoading}
      />
    </section>
  );
}

export default MainPage;
