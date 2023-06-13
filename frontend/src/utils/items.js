// import Product1 from '../images/goods/product-1.png';
// import Product2 from '../images/goods/product-2.png';
// import Product3 from '../images/goods/product-3.png';
// import Product4 from '../images/goods/product-4.png';

// function generateUniqueId() {
//   const length = 13;
//   let id = '';
//   while (id.length < length) {
//     id += Math.floor(Math.random() * 10);
//   }
//   return id;
// }

// const items = [
//   {
//     image: Product1,
//     name: 'Умная колонка Яндекс Станция Лайт, ультрафиолет',
//     amount: 1,
//     id: generateUniqueId(),
//     alt: 'Колонка Яндекс Станция Лайт',
//   },
//   {
//     image: Product2,
//     name: 'Тарелка. Императорский фарфоровый завод. Форма "Стандартная - 2", рисунок "Скарлетт 2". Костяной фарфор . 270 мм.',
//     amount: 3,
//     id: generateUniqueId(),
//     alt: 'Тарелка Императорский фарфоровый завод',
//   },
//   {
//     image: Product3,
//     name: 'Набор для рисования, детский художественный набор в чемоданчике, набор юного художника, 48 предметов и раскраска',
//     amount: 1,
//     id: generateUniqueId(),
//     alt: 'Набор для рисования',
//   },
//   {
//     image: Product4,
//     name: 'Умные часы Apple Watch Series 7 45 мм Aluminium Case, (PRODUCT)RED',
//     amount: 1,
//     id: generateUniqueId(),
//     alt: 'Часы Apple Watch Series 7',
//   },
// ];

// export default items;

import Product1 from '../images/goods/product-1.png';
import Product2 from '../images/goods/product-2.png';
import Product3 from '../images/goods/product-3.png';
import Product4 from '../images/goods/product-4.png';

function generateUniqueId() {
  const length = 13;
  let id = '';
  while (id.length < length) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}

const items = [
  {
    image: Product1,
    name: 'Умная колонка Яндекс Станция Лайт, ультрафиолет',
    amount: 1,
    additionalIds: [generateUniqueId()],
    alt: 'Колонка Яндекс Станция Лайт',
  },
  {
    image: Product2,
    name: 'Тарелка. Императорский фарфоровый завод. Форма "Стандартная - 2", рисунок "Скарлетт 2". Костяной фарфор . 270 мм.',
    amount: 3,
    additionalIds: Array.from({ length: 3 }, () => generateUniqueId()),
    alt: 'Тарелка Императорский фарфоровый завод',
  },
  {
    image: Product3,
    name: 'Набор для рисования, детский художественный набор в чемоданчике, набор юного художника, 48 предметов и раскраска',
    amount: 1,
    additionalIds: [generateUniqueId()],
    alt: 'Набор для рисования',
  },
  {
    image: Product4,
    name: 'Умные часы Apple Watch Series 7 45 мм Aluminium Case, (PRODUCT)RED',
    amount: 1,
    additionalIds: [generateUniqueId()],
    alt: 'Часы Apple Watch Series 7',
  },
];

export default items;
