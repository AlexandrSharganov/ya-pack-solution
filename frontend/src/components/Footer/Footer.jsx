import styles from './Footer.module.css';
import FooterButton from '../FooterButton/FooterButton';

function Footer() {
  return (
    <section className={styles.footer}>
      <button type="button" className={styles.problemButton}>
        Есть проблема
      </button>
      <FooterButton />
    </section>
  );
}

export default Footer;
