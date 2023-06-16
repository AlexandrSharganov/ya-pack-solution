import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Menu from '../../images/menu.svg';
import Yandex from '../../images/yandex.svg';
import Market from '../../images/market.svg';
import More from '../../images/more.svg';

function Header() {
  return (
    <section className={styles.header}>
      <div className={styles.headerGroup}>
        <button type="button" className={styles.headerButton}>
          <img src={Menu} alt="Меню" />
        </button>
        <Link to="/" className={styles.logo}>
          <img src={Yandex} alt="Yandex" />
          <img src={Market} alt="Market" />
          <span className={styles.stock}>Cклад</span>
        </Link>
      </div>
      <h1 className={styles.title}>Упаковка</h1>
      <div className={`${styles.headerGroup} ${styles.rightPath}`}>
        <div className={styles.orderStatus}>
          <p>sof-natgemokee</p>
          <div className={styles.progress}>79%</div>
        </div>
        <button type="button" className={styles.headerButton}>
          <img src={More} alt="Больше" />
        </button>
      </div>
    </section>
  );
}

export default Header;
