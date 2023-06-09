import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../../pages/MainPage';
import FinishPage from '../../pages/FinishPage';
import ProblemPage from '../../pages/ProblemPage';
import NumbersPage from '../../pages/NumbersPage';

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/finish';

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="/problem" element={<ProblemPage />} />
        <Route path="/numbers" element={<NumbersPage />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
