import Cookies from 'js-cookie';

export const BASE_URL = 'http://127.0.0.1/api/order/';

function requestResult(res) {
  if (res.ok) {
    return res.json();
  }

  const error = new Error(`Request failed with status code ${res.status}`);
  return Promise.reject(error);
}

// function getCookie(string) {
//    return string.split('csrftoken=')[1]
// }

export const csrf = Cookies.get('csrftoken');

export const getOrder = async () => {
  const res = await fetch(`${BASE_URL}front/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return requestResult(res);
};

export const getPackage = async (data) => {
  const res = await fetch(`${BASE_URL}front/${data}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return requestResult(res);
};

export const patchOrder = async (id, orderFinish) => {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrf,
    },
    body: JSON.stringify(orderFinish),
  });
  return requestResult(res);
};

export const patchProblem = async (id, orderProblem) => {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrf,
    },
    body: JSON.stringify(orderProblem),
  });
  return requestResult(res);
};
