import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../../pages/MainPage';
import FinishPage from '../../pages/FinishPage';
import ProblemPage from '../../pages/ProblemPage';
import Keyboard from '../Keyboard/Keyboard';
import { getOrder, getPackage } from '../../utils/api';
// import items from '../../utils/items';
// const orderJson = require('../../utils/order.json');

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/finish';
  const [isProductEntryPopupOpen, setIsProductEntryPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [scanProduct, setScanProduct] = useState('');
  const [scanRecommendedPackage, setScanRecommendedPackage] = useState({});
  const [scanNotRecommendedPackage, setScanNotRecommendedPackage] = useState(
    {}
  );
  const [removeElement, setRemoveElement] = useState('');

  const closeAllPopups = () => {
    setIsProductEntryPopupOpen(false);
  };

  // useEffect(() => {
  //   setOrder(JSON.parse(JSON.stringify(orderJson)));
  // }, []);

  useEffect(() => {
    if (removeElement) {
      setScanProduct('');
    }
    getOrder()
      .then((res) => {
        setOrder(JSON.parse(JSON.stringify(res)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [removeElement]);

  const checkBarcode = (data) => {
    setIsLoading(true);
    const matchingProduct = order.skus.find(
      (product) => product.barcode === data
    );
    if (matchingProduct) {
      setScanProduct(data);
      closeAllPopups();
    }

    const matchingPackage = order.packages.find((obj) => obj.barcode === data);
    if (matchingPackage) {
      getPackage(data)
        .then((res) => {
          setScanRecommendedPackage(res);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!matchingProduct && !matchingPackage) {
      getPackage(data)
        .then((res) => {
          setScanNotRecommendedPackage(res);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              order={order}
              scanProduct={scanProduct}
              scanRecommendedPackage={scanRecommendedPackage}
              scanNotRecommendedPackage={scanNotRecommendedPackage}
              removeElement={removeElement}
              setRemoveElement={setRemoveElement}
            />
          }
        />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="/problem" element={<ProblemPage />} />
      </Routes>
      {!hideFooter && <Footer onProductEntry={setIsProductEntryPopupOpen} />}
      <Keyboard
        onClose={closeAllPopups}
        isOpen={isProductEntryPopupOpen}
        isLoading={isLoading}
        onScanProduct={checkBarcode}
      />
    </>
  );
}

export default App;
