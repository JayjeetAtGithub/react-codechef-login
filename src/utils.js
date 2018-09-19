/**
 * Copyright (c) 2018 Jayjeet Chakraborty.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


/**
 * 
 * @description Converts the params object to an url query string
 * @param {*} params 
 * @param {*} delimiter
 *  
 */
export function toQueryString(params, delimiter = "&") {
  const keys = Object.keys(params);

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, "");
}


/**
 * @description Parse params from url query string
 * @param {*} queryString 
 */
export function getParams(queryString) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  const code = vars
    .map(i => {
      const pair = i.split("=");
      if (pair[0] === queryString) return pair[1];
      return null;
    })
    .filter(d => {
      if (d) return true;
      return false;
    });
  return code[0];
}


