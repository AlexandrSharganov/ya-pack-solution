// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './AfterScanning.module.css';
// import ScanImage from '../../images/scan.svg';
// import ProductCard from '../ProductCard/ProductCard';
// import BigButton from '../BigButton/BigButton';

// function AfterScanning({
//   order,
//   scanProduct,
//   scanRecommendedPackage,
//   scanNotRecommendedPackage,
// }) {
//   const [matchingProducts, setMatchingProducts] = useState([]);
//   const [matchingPackage, setMatchingPackage] = useState(new Set());
//   const [notMatchingPackages, setNotMatchingPackages] = useState(new Set());
//   const uniqueBarcodes = new Set();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (order.skus) {
//       if (scanProduct) {
//         const filteredProducts = order.skus.filter(
//           (item) => item.barcode === scanProduct
//         );
//         setMatchingProducts((prevMatchingProducts) => [
//           ...prevMatchingProducts,
//           ...filteredProducts,
//         ]);
//       }

//       if (scanRecommendedPackage.packagetype) {
//         setMatchingPackage((prevMatchingPackage) =>
//           prevMatchingPackage.add(scanRecommendedPackage.packagetype)
//         );
//       }

//       if (scanNotRecommendedPackage.packagetype) {
//         setNotMatchingPackages((prevNotMatchingPackages) =>
//           prevNotMatchingPackages.add(scanNotRecommendedPackage.packagetype)
//         );
//       }
//     }
//   }, [
//     order.skus,
//     scanProduct,
//     scanRecommendedPackage,
//     scanNotRecommendedPackage,
//   ]);

//   const handleButtonClick = () => {
//     const isValid = true;
//     if (isValid) {
//       navigate('/finish');
//     }
//   };

//   const removeProduct = (barcode) => {
//     setMatchingProducts((prevMatchingProducts) =>
//       prevMatchingProducts.filter((item) => item.barcode !== barcode)
//     );
//   };

//   const removeRecommendedPackage = (packageItem) => {
//     setMatchingPackage(
//       (prevMatchingPackage) =>
//         new Set([...prevMatchingPackage].filter((item) => item !== packageItem))
//     );
//   };

//   const removeNotRecommendedPackage = (packageItem) => {
//     setNotMatchingPackages(
//       (prevNotMatchingPackages) =>
//         new Set(
//           [...prevNotMatchingPackages].filter((item) => item !== packageItem)
//         )
//     );
//   };

//   const renderScanInstructions = () => (
//     <figure className={styles.figure}>
//       <img src={ScanImage} alt="Сканер" />
//       <figcaption>Сканируйте товары из ячейки</figcaption>
//     </figure>
//   );

//   const renderProductCards = () => (
//     <div className={styles.cardList}>
//       {matchingProducts
//         .filter((item) => {
//           if (uniqueBarcodes.has(item.barcode)) {
//             return false;
//           }
//           uniqueBarcodes.add(item.barcode);
//           return true;
//         })
//         .map((item) => (
//           <ProductCard
//             key={item.barcode}
//             item={item}
//             removeProduct={removeProduct}
//             isAfterScanning
//           />
//         ))}
//     </div>
//   );

//   return (
//     <section className={styles.section}>
//       <h1 className={styles.title}>Посылка</h1>
//       <div className={styles.text}>Рекомендованный вид упаковки</div>
//       <div className={styles.packages}>
//         {order.packages &&
//           order.packages.map((item) => (
//             <div key={item.barcode} className={styles.package}>
//               {item.package}
//             </div>
//           ))}
//       </div>
//       {(matchingPackage.size !== 0 || notMatchingPackages.size !== 0) && (
//         <>
//           <div className={styles.text}>Выбранный вид упаковки</div>
//           <div className={styles.packages}>
//             {[...matchingPackage].map((item) => (
//               <div
//                 key={item}
//                 className={`${styles.package} ${styles.packageRecommended}`}
//               >
//                 {item}
//                 <button
//                   type="button"
//                   className={styles.notRecButton}
//                   onClick={() => removeRecommendedPackage(item)}
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//             {[...notMatchingPackages].map((item) => (
//               <div
//                 key={item}
//                 className={`${styles.package} ${styles.packageNotRecommended}`}
//               >
//                 {item}
//                 <button
//                   type="button"
//                   className={styles.notRecButton}
//                   onClick={() => removeNotRecommendedPackage(item)}
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//       {!scanProduct && renderScanInstructions()}
//       {scanProduct && renderProductCards()}
//       {order.skus &&
//         (matchingPackage.size !== 0 || notMatchingPackages.size !== 0) &&
//         matchingProducts.length &&
//         order.skus.length && (
//           <BigButton
//             isValid
//             buttonText="Закрыть посылку"
//             onClick={handleButtonClick}
//           />
//         )}
//     </section>
//   );
// }

// export default AfterScanning;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AfterScanning.module.css';
import ScanImage from '../../images/scan.svg';
import ProductCard from '../ProductCard/ProductCard';
import BigButton from '../BigButton/BigButton';
import { patchOrder } from '../../utils/api';

function AfterScanning({
  order,
  scanProduct,
  scanRecommendedPackage,
  scanNotRecommendedPackage,
  removeElement,
  setRemoveElement,
  isLoading,
}) {
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [matchingPackage, setMatchingPackage] = useState(new Set());
  const [notMatchingPackages, setNotMatchingPackages] = useState(new Set());
  const uniqueBarcodes = new Set();
  const [packagesSel, setPackagesSel] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const isValid = true;

    if (isValid) {
      console.log(packagesSel);

      const packageSel = packagesSel.map((item) => ({
        package: item.packagetype,
        amount: '1',
      }));

      const orderFinish = {
        id: order.id,
        order_key: order.order_key,
        packer: '0987654321',
        packages_sel: packageSel,
        package_match: false,
        status: 'ready',
      };

      console.log(orderFinish);

      patchOrder(order.id, orderFinish)
        .then(() => {
          navigate('/finish');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const removeProduct = (barcode) => {
    setMatchingProducts((prevMatchingProduct) =>
      prevMatchingProduct.filter((item) => item.barcode !== barcode)
    );
    setRemoveElement(barcode);
  };

  const removeRecommendedPackage = (packageItem) => {
    setMatchingPackage(
      (prevMatchingPackage) =>
        new Set([...prevMatchingPackage].filter((item) => item !== packageItem))
    );
  };

  const removeNotRecommendedPackage = (packageItem) => {
    setNotMatchingPackages(
      (prevNotMatchingPackages) =>
        new Set(
          [...prevNotMatchingPackages].filter((item) => item !== packageItem)
        )
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
      {matchingProducts
        .filter((item) => {
          if (uniqueBarcodes.has(item.barcode)) {
            return false;
          }
          uniqueBarcodes.add(item.barcode);
          return true;
        })
        .map((item) => (
          <ProductCard
            key={item.barcode}
            item={item}
            removeProduct={removeProduct}
            isAfterScanning
          />
        ))}
    </div>
  );

  useEffect(() => {
    if (scanProduct) {
      const filteredProducts = order.skus.filter(
        (item) => item.barcode === scanProduct
      );
      setMatchingProducts((prevMatchingProducts) => [
        ...prevMatchingProducts,
        ...filteredProducts,
      ]);
    }

    if (scanRecommendedPackage.packagetype) {
      setPackagesSel((PackageSel) => [...PackageSel, scanRecommendedPackage]);
      setMatchingPackage(
        (prevMatchingPackage) =>
          new Set([...prevMatchingPackage, scanRecommendedPackage.packagetype])
      );
    }

    if (scanNotRecommendedPackage.packagetype) {
      setPackagesSel((PackageSel) => [
        ...PackageSel,
        scanNotRecommendedPackage,
      ]);
      setNotMatchingPackages(
        (prevNotMatchingPackages) =>
          new Set([
            ...prevNotMatchingPackages,
            scanNotRecommendedPackage.packagetype,
          ])
      );
    }
  }, [
    scanProduct,
    scanRecommendedPackage,
    scanNotRecommendedPackage,
    removeElement,
  ]);

  return (
    <section
      className={
        matchingProducts.length && order.skus.length
          ? `${styles.section} ${styles.newWidth}`
          : styles.section
      }
    >
      <h1 className={styles.title}>Посылка</h1>
      <div className={styles.text}>Рекомендованный вид упаковки</div>
      <div className={styles.packages}>
        {order.packages &&
          order.packages.map((item) => (
            <div key={item.barcode} className={styles.package}>
              {item.package}
            </div>
          ))}
      </div>
      {(matchingPackage.size !== 0 ||
        notMatchingPackages.size !== 0 ||
        matchingProducts.length !== 0) && (
        <>
          <div className={styles.text}>Выбранный вид упаковки</div>
          <div className={styles.packages}>
            {[...matchingPackage].map((item) => (
              <div
                key={item}
                className={`${styles.package} ${styles.packageRecommended}`}
              >
                {item}
                <button
                  type="button"
                  className={styles.notRecButton}
                  onClick={() => removeRecommendedPackage(item)}
                >
                  ✕
                </button>
              </div>
            ))}
            {[...notMatchingPackages].map((item) => (
              <div
                key={item}
                className={`${styles.package} ${styles.packageNotRecommended}`}
              >
                {item}
                <button
                  type="button"
                  className={styles.notRecButton}
                  onClick={() => removeNotRecommendedPackage(item)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {!scanProduct && renderScanInstructions()}
      {scanProduct && renderProductCards()}
      {(matchingPackage.size !== 0 || notMatchingPackages.size !== 0) &&
        order.skus &&
        matchingProducts.length > 0 &&
        !removeElement && (
          <BigButton
            isValid
            buttonText="Закрыть посылку"
            onClick={handleButtonClick}
            isLoading={isLoading}
          />
        )}
    </section>
  );
}

export default AfterScanning;
