export const BASE_URL = 'https://api';

function requestResult(res) {
  if (res.ok) {
    return res.json();
  }

  const error = new Error(`Request failed with status code ${res.status}`);
  return Promise.reject(error);
}

export const getOrder = async () => {
  const res = await fetch(`${BASE_URL}/order`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return requestResult(res);
};

export const postOrder = async (order) => {
  const res = await fetch(`${BASE_URL}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ order }),
  });
  return requestResult(res);
};
