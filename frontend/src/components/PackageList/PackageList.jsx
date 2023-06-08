import styles from './PackageList.module.css';
import ScanImage from '../../images/scan.svg';

function PackageList() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Посылка 1</h1>
      <div className={styles.text}>Рекомендованный вид упаковки</div>
      <div className={styles.package}>Коробка YMC</div>
      <figure>
        <img src={ScanImage} alt="Сканер" />
        <figcaption>Сканируйте товары из ячейки</figcaption>
      </figure>
    </section>
  );
}

export default PackageList;
