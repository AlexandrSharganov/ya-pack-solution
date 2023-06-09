import styles from './Finish.module.css';
import DoneLImage from '../../images/done-large.svg';

function Finish() {
  return (
    <div className={styles.done}>
      <img src={DoneLImage} alt="Готово!" />
      <p>Отличная работа!</p>
      <p>Поставьте посылку на конвейер</p>
    </div>
  );
}

export default Finish;
