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
  const [matchingPackage, setMatchingPackage] = useState([]);
  const [notMatchingPackages, setNotMatchingPackages] = useState([]);
  const uniqueBarcodes = new Set();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const isValid = true;

    if (isValid) {
      const packagesSel = [...matchingPackage, ...notMatchingPackages];
      const packageSel = packagesSel.map((item) => ({
        package: item.packagetype,
        amount: String(item.count),
      }));

      const orderFinish = {
        id: order.id,
        order_key: order.order_key,
        packer: '0987654321',
        packages_sel: packageSel,
        package_match: false,
        status: 'ready',
      };

      patchOrder(order.id, orderFinish)
        .then(() => {
          navigate('/finish');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const removeProduct = (barcode) => {
    setMatchingProducts((prevMatchingProducts) =>
      prevMatchingProducts.filter((item) => item.barcode !== barcode)
    );
    setRemoveElement(barcode);
  };

  const removePackage = (packageItem, isRecommended) => {
    if (isRecommended) {
      setMatchingPackage((prevMatchingPackage) =>
        prevMatchingPackage
          .map((item) =>
            item.packagetype === packageItem.packagetype
              ? { ...item, count: item.count - 1 }
              : item
          )
          .filter((item) => item.count > 0)
      );
    } else {
      setNotMatchingPackages((prevNotMatchingPackages) =>
        prevNotMatchingPackages
          .map((item) =>
            item.packagetype === packageItem.packagetype
              ? { ...item, count: item.count - 1 }
              : item
          )
          .filter((item) => item.count > 0)
      );
    }
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
    if (scanRecommendedPackage.packagetype) {
      const packageIndex = matchingPackage.findIndex(
        (item) => item.packagetype === scanRecommendedPackage.packagetype
      );
      if (packageIndex !== -1) {
        setMatchingPackage((prevMatchingPackage) =>
          prevMatchingPackage.map((item, index) =>
            index === packageIndex ? { ...item, count: item.count + 1 } : item
          )
        );
      } else {
        setMatchingPackage((prevMatchingPackage) => [
          ...prevMatchingPackage,
          {
            packagetype: scanRecommendedPackage.packagetype,
            count: 1,
          },
        ]);
      }
    }
  }, [scanRecommendedPackage]);

  useEffect(() => {
    if (scanNotRecommendedPackage.packagetype) {
      const packageIndex = notMatchingPackages.findIndex(
        (item) => item.packagetype === scanNotRecommendedPackage.packagetype
      );
      if (packageIndex !== -1) {
        setNotMatchingPackages((prevNotMatchingPackages) =>
          prevNotMatchingPackages.map((item, index) =>
            index === packageIndex ? { ...item, count: item.count + 1 } : item
          )
        );
      } else {
        setNotMatchingPackages((prevNotMatchingPackages) => [
          ...prevNotMatchingPackages,
          {
            packagetype: scanNotRecommendedPackage.packagetype,
            count: 1,
          },
        ]);
      }
    }
  }, [scanNotRecommendedPackage]);

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
  }, [scanProduct, removeElement, order.skus]);

  const isPackagesSelected =
    matchingPackage.length > 0 || notMatchingPackages.length > 0;
  const isProductScanned = matchingProducts.length > 0;

  return (
    <section
      className={
        isProductScanned && order.skus.length
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
              {`${item.package} ${item.amount}`}
            </div>
          ))}
      </div>
      {isPackagesSelected && (
        <>
          <div className={styles.text}>Выбранный вид упаковки</div>
          <div className={styles.packages}>
            {matchingPackage.map((item) => (
              <div
                key={item.packagetype}
                className={`${styles.package} ${styles.packageRecommended}`}
              >
                {`${item.packagetype} ${item.count}`}
                <button
                  type="button"
                  className={styles.notRecButton}
                  onClick={() => removePackage(item, true)}
                >
                  ✕
                </button>
              </div>
            ))}
            {notMatchingPackages.map((item) => (
              <div
                key={item.packagetype}
                className={`${styles.package} ${styles.packageNotRecommended}`}
              >
                {`${item.packagetype} ${item.count}`}
                <button
                  type="button"
                  className={styles.notRecButton}
                  onClick={() => removePackage(item, false)}
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
      {isPackagesSelected &&
        order.skus.length === matchingProducts.length &&
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
