import React from 'react';
import styles from './ProductCard.module.css';
import CopyableText from '../CopyableText/CopyableText';

function ProductCard({ item, setIsCopied }) {
  return (
    <div className={styles.card}>
      <img
        src="https://koshka.top/uploads/posts/2021-12/1640316382_1-koshka-top-p-narisovannikh-kotikov-1.jpg"
        alt="Картинка товара"
        className={styles.image}
      />
      <div>
        <h1 className={styles.title}>Название товара</h1>
        <div className={styles.additionalPackage}>Пузырчатая плёнка</div>
      </div>
      <div className={styles.amount}>{`${item.amount} шт.`}</div>
      <CopyableText text={item.barcode} setIsCopied={setIsCopied} />
    </div>
  );
}

export default ProductCard;
