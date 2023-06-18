import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Pages.module.css';
import Finish from '../components/Finish/Finish';
import BigButton from '../components/BigButton/BigButton';

function FinishPage({ isLoading }) {
  const navigate = useNavigate();
  const isValid = true;

  const handleButtonClick = () => {
    if (isValid) {
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <section className={styles.centerBlock}>
      <Finish />
      <BigButton
        buttonText="Готово"
        isValid={isValid}
        onClick={handleButtonClick}
        isLoading={isLoading}
      />
    </section>
  );
}

export default FinishPage;
