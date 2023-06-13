import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../../pages/MainPage';
import FinishPage from '../../pages/FinishPage';
import ProblemPage from '../../pages/ProblemPage';
import Keyboard from '../Keyboard/Keyboard';
import KeyboardPackage from '../KeyboardPackage/KeyboardPackage';
import items from '../../utils/items';

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/finish';
  const [isProductEntryPopupOpen, setIsProductEntryPopupOpen] = useState(false);
  const [isPackageEntryPopupOpen, setIsPackageEntryPopupOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [scanProduct, setScanProduct] = useState('');

  const handleCloseAllPopups = () => {
    setIsProductEntryPopupOpen(false);
    setIsPackageEntryPopupOpen(false);
  };

  useEffect(() => {
    const itemsString = JSON.stringify(items);
    localStorage.setItem('products', itemsString);

    const storedArrayString = localStorage.getItem('products');
    const storedArray = JSON.parse(storedArrayString);
    setProducts(storedArray);
  }, []);

  function checkBarcode(data) {
    const matchingProduct = products.find((product) => product.id === data);
    if (matchingProduct) {
      setScanProduct(data);
    }
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              scanProduct={scanProduct}
              onPackageEntry={setIsPackageEntryPopupOpen}
            />
          }
        />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="/problem" element={<ProblemPage />} />
      </Routes>
      {!hideFooter && <Footer onProductEntry={setIsProductEntryPopupOpen} />}
      <Keyboard
        onClose={handleCloseAllPopups}
        isOpen={isProductEntryPopupOpen}
        onScanProduct={(data) => checkBarcode(data)}
      />
      <KeyboardPackage
        onClose={handleCloseAllPopups}
        isOpen={isPackageEntryPopupOpen}
      />
    </>
  );
}

export default App;
