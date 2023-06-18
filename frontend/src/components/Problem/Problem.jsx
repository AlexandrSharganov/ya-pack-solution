// import { useNavigate } from 'react-router-dom';
// import styles from './Problem.module.css';
// import { patchProblem } from '../../utils/api';

// function Problem({ order }) {
//   const navigate = useNavigate();

//   const handleButtonClick = () => {

//     const orderProblem = {
//       id: order.id,
//       order_key: order.order_key,
//       packer: '0987654321',
//       packages_sel: [],
//       package_match: false,
//       status: 'problem',
//       problem_discription: 'broken product'
//     };

//     console.log(orderProblem);

//     patchProblem(order.id, orderProblem)
//       .then(() => {
//         navigate('/');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className={styles.centerBlock}>
//       <button type="button" className={styles.problem} onClick={handleButtonClick}>
//         Нет товара
//       </button>
//       <button type="button" className={styles.problem} onClick={handleButtonClick}>
//         Товар бракованный
//       </button>
//       <button type="button" className={styles.problem} onClick={handleButtonClick}>
//         Другая проблема
//       </button>
//     </div>
//   );
// }

// export default Problem;

import { useNavigate } from 'react-router-dom';
import styles from './Problem.module.css';
import { patchProblem } from '../../utils/api';

function Problem({ order }) {
  const navigate = useNavigate();

  const handleButtonClick = (problemType) => {
    let problemDescription;

    if (problemType === 'noProduct') {
      problemDescription = 'no product';
    } else if (problemType === 'brokenProduct') {
      problemDescription = 'broken product';
    } else if (problemType === 'otherProblem') {
      problemDescription = 'another problem';
    }

    const orderProblem = {
      id: order.id,
      order_key: order.order_key,
      packer: '0987654321',
      packages_sel: [],
      package_match: false,
      status: 'problem',
      problem_discription: problemDescription,
    };

    console.log(orderProblem);

    patchProblem(order.id, orderProblem)
      .then(() => {
        navigate('/');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.centerBlock}>
      <button
        type="button"
        className={styles.problem}
        onClick={() => handleButtonClick('noProduct')}
      >
        Нет товара
      </button>
      <button
        type="button"
        className={styles.problem}
        onClick={() => handleButtonClick('brokenProduct')}
      >
        Товар бракованный
      </button>
      <button
        type="button"
        className={styles.problem}
        onClick={() => handleButtonClick('otherProblem')}
      >
        Другая проблема
      </button>
    </div>
  );
}

export default Problem;
