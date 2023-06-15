import React from 'react';
import styles from './ProductCard.module.css';
import CopyableText from '../CopyableText/CopyableText';
// import BulkImage from '../../images/label/bulk-product.svg';
// import ChemicalsImage from '../../images/label/chemicals.svg';
// import FragileImage from '../../images/label/fragile.svg';
// import LiquidImage from '../../images/label/liquid.svg';
// import PerishableImage from '../../images/label/perishable-product.svg';
// import TechniqueImage from '../../images/label/technique.svg';
// import getImageByCargoType from '../../utils/cargotype';

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

  // const getImageByCargoType = (cargotypeId) => {
  //   switch (cargotypeId) {
  //     case 320:
  //       return {
  //         src: BulkImage,
  //         alt: 'Сыпучее',
  //       };
  //     case 485:
  //       return {
  //         src: ChemicalsImage,
  //         alt: 'Химия',
  //       };
  //     case 310:
  //       return {
  //         src: FragileImage,
  //         alt: 'Хрупкое',
  //       };
  //     case 520:
  //       return {
  //         src: LiquidImage,
  //         alt: 'Жидкость',
  //       };
  //     case 700:
  //       return {
  //         src: PerishableImage,
  //         alt: 'Скоропортящееся',
  //       };
  //     case 200:
  //       return {
  //         src: TechniqueImage,
  //         alt: 'Техника',
  //       };
  //     default:
  //       return null;
  //   }
  // };

  // const cargoTypes = item.cargotypes.map((cargotype) => cargotype.cargotype_id);
  // const images = cargoTypes.map((cargotypeId) => {
  //   const { src, alt } = getImageByCargoType(cargotypeId);
  //   return (
  //     <img key={cargotypeId} src={src} alt={alt} className={styles.cargotype} />
  //   );
  // });
  // const cargoTypes = item.cargotypes.map((cargotype) => cargotype.cargotype_id);
  // const images = cargoTypes.map((cargotypeId) => {
  //   const { src, alt } = getImageByCargoType(cargotypeId);
  //   return (
  //     <img key={cargotypeId} src={src} alt={alt} className={styles.cargotype} />
  //   );
  // });

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
          {/* <div className={styles.cargotypes}>{images}</div> */}
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

// ДЛЯ РАЗВЕРНУТЬ/СКРЫТЬ
// import React, { useState } from 'react';
// import styles from './ProductCard.module.css';
// import CopyableText from '../CopyableText/CopyableText';

// function ProductCard({ item, setIsCopied, style }) {
//   const [showMore, setShowMore] = useState(false);

//   const toggleShowMore = () => {
//     setShowMore(!showMore);
//   };

//   return (
//     <div className={styles.card}>
//       <figure className={styles.figure}>
//         <img src={item.image} alt={item.alt} className={styles.image} />
//         <figcaption className={styles.figcaption}>
//           <h1 className={styles.title}>{item.name}</h1>
//           <div className={styles.additionalPackage}>Пузырчатая плёнка</div>
//         </figcaption>
//       </figure>
//       <div className={styles.amount} style={style}>{`${item.amount} шт.`}</div>
//       {item.barcode && item.barcode.length > 1 ? (
//         <>
//           {!showMore && (
//             <div className={styles.barcode}>
//               <button
//                 type="button"
//                 className={styles.showMoreButton}
//                 onClick={toggleShowMore}
//               >
//                 Развернуть
//               </button>
//             </div>
//           )}
//           {showMore && (
//             <div className={styles.barcode}>
//               <button
//                 type="button"
//                 className={styles.showMoreButton}
//                 onClick={toggleShowMore}
//               >
//                 Скрыть
//               </button>
//               {item.barcode.map((id) => (
//                 <CopyableText key={id} text={id} setIsCopied={setIsCopied} />
//               ))}
//             </div>
//           )}
//         </>
//       ) : (
//         <div className={styles.barcode}>
//           {item.barcode && item.barcode.length > 0 && (
//             <CopyableText
//               text={item.barcode[0]}
//               setIsCopied={setIsCopied}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductCard;
