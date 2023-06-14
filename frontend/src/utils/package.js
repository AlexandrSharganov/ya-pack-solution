const getPackageLetterValue = (packageId) => {
  switch (packageId) {
    case 111:
      return 'NONPACK';
    case 112:
      return 'STRETCH';
    case 113:
      return 'MYC';
    case 114:
      return 'MYE';
    case 115:
      return 'YMG';
    case 116:
      return 'YME';
    case 117:
      return 'YMA';
    case 118:
      return 'MYB';
    case 119:
      return 'MYA';
    case 120:
      return 'MYD';
    case 121:
      return 'YMC';
    case 122:
      return 'YMW';
    case 123:
      return 'YMF';
    case 124:
      return 'YML';
    case 125:
      return 'YMX';
    case 126:
      return 'MYF';
    case 127:
      return 'YMB';
    default:
      return 'N/A';
  }
};

export default getPackageLetterValue;
// const getPackageLetterValue = (packageId) => {
//   const packageIdString = packageId.toString();

//   switch (packageIdString) {
//     case '111':
//       return 'NONPACK';
//     case '112':
//       return 'STRETCH';
//     case '113':
//       return 'MYC';
//     case '114':
//       return 'MYE';
//     case '115':
//       return 'YMG';
//     case '116':
//       return 'YME';
//     case '117':
//       return 'YMA';
//     case '118':
//       return 'MYB';
//     case '119':
//       return 'MYA';
//     case '120':
//       return 'MYD';
//     case '121':
//       return 'YMC';
//     case '122':
//       return 'YMW';
//     case '123':
//       return 'YMF';
//     case '124':
//       return 'YML';
//     case '125':
//       return 'YMX';
//     case '126':
//       return 'MYF';
//     case '127':
//       return 'YMB';
//     default:
//       return 'N/A';
//   }
// };

// export default getPackageLetterValue;
