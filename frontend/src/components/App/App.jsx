import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../../pages/MainPage';
import FinishPage from '../../pages/FinishPage';
import ProblemPage from '../../pages/ProblemPage';
import Keyboard from '../Keyboard/Keyboard';

const orderJson = require('../../utils/order.json');

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/finish';
  const [isProductEntryPopupOpen, setIsProductEntryPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [scanProduct, setScanProduct] = useState('');

  const closeAllPopups = () => {
    setIsProductEntryPopupOpen(false);
  };

  useEffect(() => {
    setOrder(JSON.parse(JSON.stringify(orderJson)));
  }, []);

  const checkBarcode = (data) => {
    setIsLoading(true);
    const matchingProduct = order.skus.find(
      (product) => product.barcode === data
    );
    if (matchingProduct) {
      setScanProduct(data);
      console.log(data);
      closeAllPopups();
    }

    const matchingPackage = order.package.find((obj) => obj.package === data);
    if (matchingPackage) {
      setScanProduct(data);
      console.log(data);
      closeAllPopups();
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
              onPackageEntry={setIsProductEntryPopupOpen}
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

// import { useState, useEffect } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
// import MainPage from '../../pages/MainPage';
// import FinishPage from '../../pages/FinishPage';
// import ProblemPage from '../../pages/ProblemPage';
// import Keyboard from '../Keyboard/Keyboard';
// // import KeyboardPackage from '../KeyboardPackage/KeyboardPackage';
// // import { getOrder } from '../../utils/api';
// // import items from '../../utils/items';
// const orderJson = require('../../utils/order.json');

// function App() {
//   const location = useLocation();
//   const hideFooter = location.pathname === '/finish';
//   const [isProductEntryPopupOpen, setIsProductEntryPopupOpen] = useState(false);
//   // const [isPackageEntryPopupOpen, setIsPackageEntryPopupOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [order, setOrder] = useState({});
//   // const [products, setProducts] = useState([]);
//   // const [packages, setPackages] = useState([]);
//   const [scanProduct, setScanProduct] = useState('');

//   const closeAllPopups = () => {
//     setIsProductEntryPopupOpen(false);
//     // setIsPackageEntryPopupOpen(false);
//   };

//   useEffect(() => {
//     // getOrder()
//     //   .then((res) => {
//     //     localStorage.setItem('packages', res);
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });

//     setOrder(JSON.parse(JSON.stringify(orderJson)));

//     // const itemsString = JSON.stringify(items.sku_list);
//     // localStorage.setItem('products', itemsString);

//     // const productsArrayString = localStorage.getItem('products');
//     // const productsArray = JSON.parse(productsArrayString);

//     // setProducts(productsArray);
//   }, []);

//   function checkBarcode(data) {
//     setIsLoading(true);
//     const matchingProduct = order.skus.find(
//       (product) => product.barcode === data
//     );
//     if (matchingProduct) {
//       setScanProduct(data);
//       console.log(data);
//       closeAllPopups();
//     }

//     const matchingPackage = order.package.find((obj) => obj.package === data);
//     if (matchingPackage) {
//       setScanProduct(data);
//       console.log(data);
//       closeAllPopups();
//     }
//     setIsLoading(false);
//   }

//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <MainPage
//               order={order}
//               scanProduct={scanProduct}
//               onPackageEntry={setIsProductEntryPopupOpen}
//             />
//           }
//         />
//         <Route path="/finish" element={<FinishPage />} />
//         <Route path="/problem" element={<ProblemPage />} />
//       </Routes>
//       {!hideFooter && <Footer onProductEntry={setIsProductEntryPopupOpen} />}
//       <Keyboard
//         onClose={closeAllPopups}
//         isOpen={isProductEntryPopupOpen}
//         isLoading={isLoading}
//         onScanProduct={(data) => checkBarcode(data)}
//       />
//       {/* <KeyboardPackage
//         onClose={closeAllPopups}
//         isOpen={isPackageEntryPopupOpen}
//       /> */}
//     </>
//   );
// }

// export default App;
