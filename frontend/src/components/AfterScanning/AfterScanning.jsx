import React, { useEffect, useState } from 'react';
import styles from './AfterScanning.module.css';
import ScanImage from '../../images/scan.svg';
import ProductCard from '../ProductCard/ProductCard';

function AfterScanning({ order, scanProduct, scanNotRecommendedPackage }) {
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [matchingPackage, setMatchingPackage] = useState(new Set());
  const [notMatchingPackages, setNotMatchingPackages] = useState(new Set());

  useEffect(() => {
    if (
      (order.skus && scanProduct) ||
      (order.skus && scanNotRecommendedPackage)
    ) {
      const filteredProducts = order.skus.filter(
        (item) => item.barcode === scanProduct
      );
      setMatchingProducts((prevMatchingProducts) => [
        ...prevMatchingProducts,
        ...filteredProducts,
      ]);

      if (scanProduct && scanProduct.length === 3) {
        setMatchingPackage((prevMatchingPackage) =>
          prevMatchingPackage.add(scanProduct)
        );
      }

      if (scanNotRecommendedPackage) {
        setNotMatchingPackages((prevNotMatchingPackages) =>
          prevNotMatchingPackages.add(scanNotRecommendedPackage)
        );
      }
    }
  }, [order.skus, scanProduct, scanNotRecommendedPackage]);

  const removeProduct = (barcode) => {
    setMatchingProducts((prevMatchingProducts) =>
      prevMatchingProducts.filter((item) => item.barcode !== barcode)
    );
  };

  const renderScanInstructions = () => (
    <figure className={styles.figure}>
      <img src={ScanImage} alt="Сканер" />
      <figcaption>Сканируйте товары из ячейки</figcaption>
    </figure>
  );

  const renderProductCards = () => (
    <div className={styles.cardList}>
      {matchingProducts.map((item) => (
        <ProductCard
          key={item.barcode}
          item={item}
          removeProduct={removeProduct}
        />
      ))}
    </div>
  );

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Посылка 1</h1>
      <div className={styles.text}>Рекомендованный вид упаковки</div>
      <div className={styles.packages}>
        {order.package &&
          order.package.map((item) => (
            <div key={item.package} className={styles.package}>
              {item.package}
            </div>
          ))}
      </div>
      {(matchingPackage.size !== 0 || notMatchingPackages.size !== 0) && (
        <>
          <div className={`${styles.text} ${styles.textOrange}`}>
            Выбранный вид упаковки
          </div>
          <div className={styles.packages}>
            {[...matchingPackage].map((item) => (
              <div
                key={item}
                className={`${styles.package} ${styles.packageRecommended}`}
              >
                {item}
              </div>
            ))}
            {[...notMatchingPackages].map((item) => (
              <div
                key={item}
                className={`${styles.package} ${styles.packageNotRecommended}`}
              >
                {item}
              </div>
            ))}
          </div>
        </>
      )}
      {!scanProduct && renderScanInstructions()}
      {scanProduct && renderProductCards()}
    </section>
  );
}

export default AfterScanning;

// import React, { useEffect, useState } from 'react';
// import styles from './AfterScanning.module.css';
// import ScanImage from '../../images/scan.svg';
// import ProductCard from '../ProductCard/ProductCard';

// function AfterScanning({ order, onPackageEntry, scanProduct }) {
//   const [matchingProducts, setMatchingProducts] = useState([]);

//   useEffect(() => {
//     // const storedProductsString = localStorage.getItem('products');
//     // const storedProducts = JSON.parse(storedProductsString);
//     if (order.skus !== undefined) {
//       const filteredProducts = order.skus.filter(
//         (item) => scanProduct === item.barcode
//       );

//       setMatchingProducts((prevMatchingProducts) => [
//         ...prevMatchingProducts,
//         ...filteredProducts,
//       ]);
//     }
//   }, [scanProduct]);

//   const renderScanInstructions = () => (
//     <figure className={styles.figure}>
//       <img src={ScanImage} alt="Сканер" />
//       <figcaption>Сканируйте товары из ячейки</figcaption>
//     </figure>
//   );

//   const renderProductCards = () => (
//     <div className={styles.cardList}>
//       {matchingProducts.map((item) => (
//         <ProductCard key={item.barcode} item={item} />
//       ))}
//     </div>
//   );

//   return (
//     <section className={styles.section}>
//       <h1 className={styles.title}>Посылка 1</h1>
//       <div className={styles.text}>Рекомендованный вид упаковки</div>
//       <button onClick={onPackageEntry} type="button" className={styles.package}>
//         Коробка YMC
//       </button>
//       {!scanProduct && renderScanInstructions()}
//       {scanProduct && renderProductCards()}
//     </section>
//   );
// }

// export default AfterScanning;
