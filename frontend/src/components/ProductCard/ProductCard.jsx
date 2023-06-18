import React from 'react';
import styles from './ProductCard.module.css';
import CopyableText from '../CopyableText/CopyableText';
import getImageByCargoType from '../../utils/cargotype';

function ProductCard({
  item,
  setIsCopied,
  removeProduct,
  amountStyle,
  isAfterScanning,
}) {
  const handleRemove = () => {
    removeProduct(item.barcode);
  };

  const cargoTypes = item.cargotypes.map((cargotype) => cargotype.cargotype_id);
  const images = cargoTypes.map((cargotypeId) => {
    const { src, alt } = getImageByCargoType(cargotypeId);
    return (
      <img key={cargotypeId} src={src} alt={alt} className={styles.cargotype} />
    );
  });

  return (
    <div className={styles.card}>
      <figure className={styles.figure}>
        <img
          src="https://koshka.top/uploads/posts/2021-12/1640316382_1-koshka-top-p-narisovannikh-kotikov-1.jpg"
          alt="Картинка товара"
          className={styles.image}
        />
        <figcaption className={styles.figcaption}>
          <h1 className={styles.title}>Название товара</h1>
          <div className={styles.cargotypes}>{images}</div>
        </figcaption>
      </figure>
      <div
        className={styles.amount}
        style={amountStyle}
      >{`${item.amount} шт.`}</div>
      <CopyableText text={item.barcode} setIsCopied={setIsCopied} />
      {isAfterScanning && (
        <button type="button" onClick={handleRemove} className={styles.delete}>
          ✕
        </button>
      )}
    </div>
  );
}

export default ProductCard;
