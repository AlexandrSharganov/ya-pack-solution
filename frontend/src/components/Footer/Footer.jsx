import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';
import EnterKeyboardButton from '../EnterKeyboardButton/EnterKeyboardButton';

function Footer({ onProductEntry }) {
  const location = useLocation();
  const isProblemPage = location.pathname === '/problem';

  return (
    <section
      className={`${styles.footer} ${isProblemPage && styles.footerYellow}`}
    >
      {!isProblemPage ? (
        <>
          <Link to="/problem" className={styles.link}>
            <button type="button" className={styles.problemButton}>
              Есть проблема
            </button>
          </Link>
          <EnterKeyboardButton onProductEntry={onProductEntry} />
        </>
      ) : (
        <Link to="/" className={styles.link}>
          <button type="button" className={styles.problemButton}>
            Назад
          </button>
        </Link>
      )}
    </section>
  );
}

export default Footer;
