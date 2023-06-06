import styles from './Pages.module.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function MainPage() {
  return (
    <section className={styles.main}>
      <Header />
      <Footer />
    </section>
  );
}

export default MainPage;
