import { useState, useEffect } from 'react';
import styles from './BeforeScanning.module.css';
import ProductCard from '../ProductCard/ProductCard';
import Done from '../../images/done-small.svg';

function BeforeScanning({ order, scanProduct }) {
  const [isCopied, setIsCopied] = useState(false);
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [scanProducts, setScanProducts] = useState([]);

  useEffect(() => {
    setScanProducts((prevScanProducts) => [...prevScanProducts, scanProduct]);
  }, [scanProduct]);

  useEffect(() => {
    // const storedProductsString = localStorage.getItem('products');
    // const storedProducts = JSON.parse(storedProductsString);
    if (order.skus !== undefined) {
      const filteredProducts = order.skus.filter(
        (item) => !scanProducts.includes(item.barcode)
      );

      setMatchingProducts(filteredProducts);
    }
  }, [scanProducts]);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [isCopied]);

  const renderAmount = () => {
    if (matchingProducts.length !== 0) {
      return (
        <span className={styles.amount}>{matchingProducts.length} товара</span>
      );
    }
    return null;
  };

  const renderProductCards = () => (
    <div className={styles.cardList}>
      {matchingProducts.map((item) => (
        <ProductCard key={item.barcode} item={item} setIsCopied={setIsCopied} />
      ))}
    </div>
  );

  const renderDone = () => {
    if (matchingProducts.length === 0) {
      return (
        <div className={styles.done}>
          <img src={Done} alt="Готово!" />
          <p className={styles.doneTitle}>
            Отсканировано {scanProducts.length - 2} товара!
          </p>
          <p className={styles.doneSubtitle}>
            Упакуйте их и отсканируйте упаковку
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <h1 className={styles.title}>Ячейка B-09</h1>
        <span className={styles.post}>Почта России</span>
      </div>
      {renderAmount()}
      {renderProductCards()}
      {isCopied && <div className={styles.copyCode}>Штрихкод скопирован</div>}
      {renderDone()}
    </section>
  );
}

export default BeforeScanning;
