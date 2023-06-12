import React, { useState } from 'react';
import { SHA1 } from 'crypto-js';
import Barcode from 'react-barcode';

function BarcodeGenerate() {
  const [originalString] = useState('af49bf330e2cf16e44f0be1bdfe337bd');

  const generateBarcodeId = (str) => {
    const hash = SHA1(str).toString();
    const numericHash = hash.replace(/\D/g, '');
    const barcodeId = numericHash.substr(0, 13);
    return barcodeId;
  };

  const barcodeId = generateBarcodeId(originalString);

  return (
    <div>
      <p>Original String: {originalString}</p>
      <p>Barcode ID: {barcodeId}</p>
      <Barcode value={barcodeId} />
    </div>
  );
}

export default BarcodeGenerate;
