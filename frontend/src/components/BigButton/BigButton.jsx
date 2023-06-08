// import { useState } from 'react';
// import PropTypes from 'prop-types';
import styles from './BigButton.module.css';

function BigButton(props) {
  const { buttonText, onClick } = props;
  return (
    <button type="submit" className={styles.button} onClick={onClick}>
      {buttonText}
    </button>
  );
}

// BigButton.propTypes = {
//   buttonText: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
// };

export default BigButton;
