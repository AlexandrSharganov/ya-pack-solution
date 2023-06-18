import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../../pages/MainPage';
import FinishPage from '../../pages/FinishPage';
import ProblemPage from '../../pages/ProblemPage';
import Keyboard from '../Keyboard/Keyboard';
import { getOrder, getPackage } from '../../utils/api';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrder();
        setOrder(JSON.parse(JSON.stringify(res)));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [removeElement]);

  const closeAllPopups = () => {
    setIsProductEntryPopupOpen(false);
  };

  const checkBarcode = async (data) => {
    setIsLoading(true);
    const matchingProduct = order.skus.find(
      (product) => product.barcode === data
    );

    if (matchingProduct) {
      setScanProduct(data);
      closeAllPopups();
    } else {
      try {
        const matchingPackage = order.packages.find(
          (obj) => obj.barcode === data
        );
        if (matchingPackage) {
          const res = await getPackage(data);
          setScanRecommendedPackage(res);
          closeAllPopups();
        } else {
          const res = await getPackage(data);
          setScanNotRecommendedPackage(res);
          closeAllPopups();
        }
      } catch (err) {
        console.log(err);
      }
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
              setScanProduct={setScanProduct}
              scanRecommendedPackage={scanRecommendedPackage}
              scanNotRecommendedPackage={scanNotRecommendedPackage}
              removeElement={removeElement}
              setRemoveElement={setRemoveElement}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/finish" element={<FinishPage isLoading={isLoading} />} />
        <Route path="/problem" element={<ProblemPage order={order} />} />
      </Routes>
      {!hideFooter && (
        <Footer
          removeElement={removeElement}
          onProductEntry={setIsProductEntryPopupOpen}
        />
      )}
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
