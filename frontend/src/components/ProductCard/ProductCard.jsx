import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import CopyableText from '../CopyableText/CopyableText';

function ProductCard({ item, setIsCopied, style }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={styles.card}>
      <figure className={styles.figure}>
        <img src={item.image} alt={item.alt} className={styles.image} />
        <figcaption className={styles.figcaption}>
          <h1 className={styles.title}>{item.name}</h1>
          <div className={styles.additionalPackage}>Пузырчатая плёнка</div>
        </figcaption>
      </figure>
      <div className={styles.amount} style={style}>{`${item.amount} шт.`}</div>
      {item.additionalIds && item.additionalIds.length > 1 ? (
        <>
          {!showMore && (
            <div className={styles.additionalIds}>
              <button
                type="button"
                className={styles.showMoreButton}
                onClick={toggleShowMore}
              >
                Развернуть
              </button>
            </div>
          )}
          {showMore && (
            <div className={styles.additionalIds}>
              <button
                type="button"
                className={styles.showMoreButton}
                onClick={toggleShowMore}
              >
                Скрыть
              </button>
              {item.additionalIds.map((id) => (
                <CopyableText key={id} text={id} setIsCopied={setIsCopied} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={styles.additionalIds}>
          {item.additionalIds && item.additionalIds.length > 0 && (
            <CopyableText
              text={item.additionalIds[0]}
              setIsCopied={setIsCopied}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ProductCard;
