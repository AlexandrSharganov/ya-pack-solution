import styles from './Pages.module.css';
import ProductList from '../components/ProductList/ProductList';
import PackageList from '../components/PackageList/PackageList';

function MainPage() {
  return (
    <section className={styles.main}>
      <ProductList />
      <PackageList />
    </section>
  );
}

export default MainPage;
