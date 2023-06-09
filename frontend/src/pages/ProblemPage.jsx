import styles from './Pages.module.css';

function ProblemPage() {
  return (
    <section className={styles.main}>
      <div className={styles.problems}>
        <div className={styles.problem}>Нет товара</div>
        <div className={styles.problem}>Товар бракованный</div>
        <div className={styles.problem}>Другая проблема</div>
      </div>
    </section>
  );
}

export default ProblemPage;
