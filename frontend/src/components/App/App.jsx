import { Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import NumbersPage from '../../pages/NumbersPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/numbers" element={<NumbersPage />} />
    </Routes>
  );
}

export default App;
