import styles from './AfterScanning.module.css';
import ScanImage from '../../images/scan.svg';
// import ProductCard from '../ProductCard/ProductCard';
// import items from '../../utils/items';

function AfterScanning({ onPackageEntry }) {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Посылка 1</h1>
      <div className={styles.text}>Рекомендованный вид упаковки</div>
      <button onClick={onPackageEntry} type="button" className={styles.package}>
        Коробка YMC
      </button>
      <figure>
        <img src={ScanImage} alt="Сканер" />
        <figcaption>Сканируйте товары из ячейки</figcaption>
      </figure>
      {/* <div className={styles.cardList}>
        {items.map((item) => (
          <ProductCard key={item.code} item={item} />
        ))}
      </div> */}
    </section>
  );
}

export default AfterScanning;
