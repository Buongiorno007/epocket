import React from "react";
import { AsyncStorage } from "react-native";
global.token = "";
/**
 *
 * @param { string } url API link
 * @param { boolean } needToken if token does't need set false
 */
export const httpGet = (url, token) => {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
    // 'If-Match': '*'
  };
  const OPTIONS = {
    method: "GET",
    headers:
      token !== null
        ? {
            ...defaultHeaders,
            Authorization: `JWT ${token}`
          }
        : { ...defaultHeaders }
  };

  return sendRequest(url, OPTIONS);
};

/**
 *
 * @param { string } url API link
 * @param { Object } body parameters
 * @param { boolean } needToken if token does't need set false
 */
export const httpPost = (url, body, token) => {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const OPTIONS = {
    method: "POST",
    headers:
      token !== null
        ? {
            ...defaultHeaders,
            Authorization: `JWT ${token}`
          }
        : { ...defaultHeaders },
    body: body
  };

  return sendRequest(url, OPTIONS);
};
/**
 *
 * @param { string } url API link
 * @param { Object } OPTIONS parameters for configuring request
 */
function sendRequest(url, OPTIONS) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ code: 408, statusText: "Request Timeout" });
    }, 45000);
    fetch(url, OPTIONS).then(response => {
      // console.log("---- req ", response);
      if (response.status >= 200 && response.status < 300) {
        response.json().then(body => {
          resolve({
            body: body,
            status: response.status,
            statusText: response.statusText
          });
        });
      } else {
        reject({
          body: [],
          code: parseInt(`${response.status}`)
        });
      }
    });
  });
}

/**
 *
 * @param { string } url API link
 * @param { boolean } sessionId if sessionId does't need set false
 */
export const newHttpGet = url => {
  const OPTIONS = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return new Promise((resolve, reject) => {
    fetch(url, OPTIONS).then(response => {
      if (
        (response.status >= 200 && response.status < 300) ||
        response.status === 304
      ) {
        response.json().then(result => {
          resolve(result);
        });
      } else {
        reject({ code: `${response.status}` });
      }
    });
  });
};

/**
 *
 * @param { string } url API link
 * @param { Object } body parameters
 */
export const newHttpPost = (url, body) => {
  const OPTIONS = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body
  };

  return newSendRequest(url, OPTIONS);
};

/**
 *
 * @param { string } url API link
 * @param { Object } OPTIONS parameters for configuring request
 */
function newSendRequest(url, OPTIONS) {
  return new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      reject({ code: 408, message: "Request Timeout" });
    }, 45000);
    fetch(url, OPTIONS).then(response => {
      if (response.status >= 200 && response.status < 300) {
        // console.log("---- req ", response);
        response.json().then(result => {
          clearTimeout(timeout);
          resolve(result);
        });
      } else {
        clearTimeout(timeout);
        reject({
          code: parseInt(`${response.status}`)
        });
      }
    });
  });
}
