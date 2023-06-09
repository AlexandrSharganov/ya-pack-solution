import React from 'react';
import styles from './ProductCard.module.css';
import CopyableText from '../CopyableText/CopyableText';

function ProductCard({ item, setIsCopied }) {
  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.alt} className={styles.image} />
      <div>
        <h1 className={styles.title}>{item.name}</h1>
        <div className={styles.additionalPackage}>Пузырчатая плёнка</div>
      </div>
      <div className={styles.amount}>{`${item.amount} шт.`}</div>
      <CopyableText text={item.code} setIsCopied={setIsCopied} />
    </div>
  );
}

export default ProductCard;
