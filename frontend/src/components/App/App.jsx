import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../../pages/MainPage';
import Keyboard from '../Keyboard/Keyboard';

function App() {
  const [isProductEntryPopupOpen, setIsProductEntryPopupOpen] = useState(false);

  const handleCloseAllPopups = () => {
    setIsProductEntryPopupOpen(false);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/keyboard" element={<KeyboardPage />} /> */}
      </Routes>
      <Footer onProductEntry={setIsProductEntryPopupOpen} />
      <Keyboard
        onClose={handleCloseAllPopups}
        isOpen={isProductEntryPopupOpen}
      />
    </>
  );
}

export default App;
