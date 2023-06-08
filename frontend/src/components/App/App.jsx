import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../../pages/MainPage';
import KeyboardPage from '../../pages/KeyboardPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/keyboard" element={<KeyboardPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
