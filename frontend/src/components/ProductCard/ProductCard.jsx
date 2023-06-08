import styles from './ProductCard.module.css';

function ProductCard({ item }) {
  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.alt} className={styles.image} />
      <div>
        <h1 className={styles.title}>{item.name}</h1>
        <div className={styles.additionalPackage}>Пузырчатая плёнка</div>
      </div>
      <div className={styles.amount}>{`${item.amount} шт.`}</div>
      <span className={styles.code}>{item.code}</span>
    </div>
  );
}

export default ProductCard;
