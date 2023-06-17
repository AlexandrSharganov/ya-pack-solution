import React, { useState, useEffect } from 'react';
import styles from './BeforeScanning.module.css';
import ProductCard from '../ProductCard/ProductCard';
import DoneBlock from '../DoneBlock/DoneBlock';
import Loader from '../Loader/Loader';

function BeforeScanning({ order, scanProduct, removeElement, hasBigButton }) {
  const [isCopied, setIsCopied] = useState(false);
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [scanProducts, setScanProducts] = useState([]);
  useEffect(() => {
    setScanProducts((prevScanProducts) => [...prevScanProducts, scanProduct]);
  }, [scanProduct]);

  useEffect(() => {
    if (order.skus !== undefined) {
      const filteredProducts = order.skus.filter(
        (item) => !scanProducts.includes(item.barcode)
      );

      setMatchingProducts(filteredProducts);

      if (removeElement) {
        const filteredRemoveProducts = order.skus.filter((item) =>
          removeElement.includes(item.barcode)
        );
        setMatchingProducts(filteredRemoveProducts);
      }
    }
  }, [order.skus, scanProducts, removeElement]);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [isCopied]);

  const renderProductCards = () => (
    <div className={styles.cardList}>
      {matchingProducts.map((item) => (
        <ProductCard
          key={item.barcode}
          item={item}
          setIsCopied={setIsCopied}
          isAfterScanning={false}
        />
      ))}
    </div>
  );

  const renderDone = () => {
    if (matchingProducts.length === 0) {
      return <DoneBlock order={order} />;
    }
    return null;
  };

  if (!order.skus) {
    return <Loader />;
  }

  return (
    <section
      className={
        hasBigButton ? `${styles.section} ${styles.flexNone}` : styles.section
      }
    >
      {/* Старая логика
      <section
        className={
          renderDone() ? `${styles.section} ${styles.flexNone}` : styles.section
        }
      > */}
      <div className={styles.box}>
        <h1 className={styles.title}>Ячейка B-09</h1>
        <span className={styles.post}>Почта России</span>
      </div>
      <span className={styles.amount}>{matchingProducts.length} товара</span>
      {renderProductCards()}
      {isCopied && <div className={styles.copyCode}>Штрихкод скопирован</div>}
      {renderDone()}
    </section>
  );
}

export default BeforeScanning;
