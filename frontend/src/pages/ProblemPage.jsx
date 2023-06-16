import styles from './Pages.module.css';

function ProblemPage() {
  return (
    <div className={styles.centerBlock}>
      <div className={styles.problem}>Нет товара</div>
      <div className={styles.problem}>Товар бракованный</div>
      <div className={styles.problem}>Другая проблема</div>
    </div>
  );
}

export default ProblemPage;
