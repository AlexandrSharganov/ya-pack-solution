// import styles from './PackageList.module.css';
import ScanImage from '../../images/scan.svg';

function PackageList() {
  return (
    <section>
      <h1>Посылка 1</h1>
      <span>Рекомендованный вид упаковки</span>
      <div>Коробка YMC</div>
      <img src={ScanImage} alt="Сканер" />
      <p>Сканируйте товары из ячейки</p>
    </section>
  );
}

export default PackageList;
