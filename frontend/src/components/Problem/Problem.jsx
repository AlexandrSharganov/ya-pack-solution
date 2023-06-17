import styles from './Problem.module.css';

function Problem() {
  return (
    <div className={styles.centerBlock}>
      <button type="button" className={styles.problem}>
        Нет товара
      </button>
      <button type="button" className={styles.problem}>
        Товар бракованный
      </button>
      <button type="button" className={styles.problem}>
        Другая проблема
      </button>
    </div>
  );
}

export default Problem;
