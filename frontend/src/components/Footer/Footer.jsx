// import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import FooterButton from '../FooterButton/FooterButton';

function Footer({ onProductEntry }) {
  return (
    <section className={styles.footer}>
      <button type="button" className={styles.problemButton}>
        Есть проблема
      </button>
      {/* <Link to="/keyboard" className={styles.link}> */}
      <FooterButton onProductEntry={onProductEntry} />
      {/* </Link> */}
    </section>
  );
}

export default Footer;
