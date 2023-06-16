import React from 'react';
import styles from './DoneBlock.module.css';
import Done from '../../images/done-small.svg';

function DoneBlock({ order }) {
  return (
    <div className={styles.done}>
      <img src={Done} alt="Готово!" />
      <p className={styles.doneTitle}>
        Отсканировано {order.skus && order.skus.length} товара!
      </p>
      <p className={styles.doneSubtitle}>Упакуйте их и отсканируйте упаковку</p>
    </div>
  );
}

export default DoneBlock;
