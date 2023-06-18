import React from 'react';
import styles from './Loader.module.css';

function Loader({ loaderColor }) {
  return <div className={styles.spinner} style={loaderColor} />;
}

export default Loader;
