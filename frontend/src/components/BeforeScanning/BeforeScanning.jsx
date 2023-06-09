import { useState, useEffect } from 'react';
import styles from './BeforeScanning.module.css';
import ProductCard from '../ProductCard/ProductCard';
import items from '../../utils/items';
// import Done from '../../images/done-small.svg';

function BeforeScanning() {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [isCopied]);

  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <h1 className={styles.title}>Ячейка B-09</h1>
        <span className={styles.post}>Почта России</span>
      </div>
      <span className={styles.amount}>4 товара</span>
      <div className={styles.cardList}>
        {items.map((item) => (
          <ProductCard key={item.code} item={item} setIsCopied={setIsCopied} />
        ))}
      </div>
      {isCopied && <div className={styles.copyCode}>Штрихкод скопирован</div>}
      {/* <div className={styles.done}>
        <img src={Done} alt="Готово!" />
        <p>Отсканировано 4 товара!</p>
        <p>Упакуйте их и отсканируйте упаковку</p>
      </div> */}
    </section>
  );
}

export default BeforeScanning;
