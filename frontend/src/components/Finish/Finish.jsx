import styles from './Finish.module.css';
import DoneLImage from '../../images/done-large.svg';

function Finish() {
  return (
    <div className={styles.done}>
      <img src={DoneLImage} alt="Готово!" />
      <h1 className={styles.title}>Отличная работа!</h1>
      <p className={styles.text}>Поставьте посылку на конвейер</p>
    </div>
  );
}

export default Finish;
