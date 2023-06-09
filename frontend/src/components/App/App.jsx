import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../../pages/MainPage';
import FinishPage from '../../pages/FinishPage';
import ProblemPage from '../../pages/ProblemPage';
import Keyboard from '../Keyboard/Keyboard';
// import KeyboardPage from '../../pages/KeyboardPage';

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/finish';
  const [isProductEntryPopupOpen, setIsProductEntryPopupOpen] = useState(false);

  const handleCloseAllPopups = () => {
    setIsProductEntryPopupOpen(false);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="/problem" element={<ProblemPage />} />
        {/* <Route path="/keyboard" element={<KeyboardPage />} /> */}
      </Routes>
      {!hideFooter && <Footer onProductEntry={setIsProductEntryPopupOpen} />}
      <Keyboard
        onClose={handleCloseAllPopups}
        isOpen={isProductEntryPopupOpen}
      />
    </>
  );
}

export default App;
