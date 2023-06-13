import React, { useEffect, useState } from 'react';
import styles from './AfterScanning.module.css';
import ScanImage from '../../images/scan.svg';
import ProductCard from '../ProductCard/ProductCard';

function AfterScanning({ onPackageEntry, scanProduct }) {
  const [matchingProducts, setMatchingProducts] = useState([]);

  useEffect(() => {
    const storedProductsString = localStorage.getItem('products');
    const storedProducts = JSON.parse(storedProductsString);

    const filteredProducts = storedProducts.filter(
      (item) => scanProduct === item.id
    );

    setMatchingProducts((prevMatchingProducts) => [
      ...prevMatchingProducts,
      ...filteredProducts,
    ]);
  }, [scanProduct]);

  const renderScanInstructions = () => (
    <figure>
      <img src={ScanImage} alt="Сканер" />
      <figcaption>Сканируйте товары из ячейки</figcaption>
    </figure>
  );

  const renderProductCards = () => (
    <div className={styles.cardList}>
      {matchingProducts.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Посылка 1</h1>
      <div className={styles.text}>Рекомендованный вид упаковки</div>
      <button onClick={onPackageEntry} type="button" className={styles.package}>
        Коробка YMC
      </button>
      {!scanProduct && renderScanInstructions()}
      {scanProduct && renderProductCards()}
    </section>
  );
}

export default AfterScanning;
