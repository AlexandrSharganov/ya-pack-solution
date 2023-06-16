import BulkImage from '../images/label/bulk-product.svg';
import ChemicalsImage from '../images/label/chemicals.svg';
import FragileImage from '../images/label/fragile.svg';
import LiquidImage from '../images/label/liquid.svg';
import PerishableImage from '../images/label/perishable-product.svg';
import TechniqueImage from '../images/label/technique.svg';
// import Null from '../images/null.png';
import Null from '../images/lost.gif';

const getImageByCargoType = (cargotypeId) => {
  switch (cargotypeId) {
    case 320:
      // 291 сейчас на бэке
      return {
        src: BulkImage,
        alt: 'Сыпучее',
      };
    case 485:
      // 340 сейчас на бэке
      return {
        src: ChemicalsImage,
        alt: 'Химия',
      };
    case 310:
      // 950 сейчас на бэке
      return {
        src: FragileImage,
        alt: 'Хрупкое',
      };
    case 520:
      return {
        src: LiquidImage,
        alt: 'Жидкость',
      };
    case 700:
      return {
        src: PerishableImage,
        alt: 'Скоропортящееся',
      };
    case 200:
      return {
        src: TechniqueImage,
        alt: 'Техника',
      };
    default:
      return {
        src: Null,
        alt: 'Null',
      };
  }
};

export default getImageByCargoType;
