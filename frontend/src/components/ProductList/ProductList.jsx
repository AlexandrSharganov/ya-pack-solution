import styles from './ProductList.module.css';
import ProductCard from '../ProductCard/ProductCard';
import items from '../../utils/items';

function ProductList() {
  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <h1 className={styles.title}>Ячейка B-09</h1>
        <span className={styles.post}>Почта России</span>
      </div>
      <span className={styles.amount}>4 товара</span>
      {items.map((item) => (
        <ProductCard key={item.code} item={item} />
      ))}
    </section>
  );
}

export default ProductList;
