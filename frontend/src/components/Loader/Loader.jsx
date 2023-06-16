import React from 'react';
import styles from './Loader.module.css'; // Создайте файл Spinner.css в той же папке с этим файлом

function Loader() {
  return <div className={styles.spinner} />;
}

export default Loader;
