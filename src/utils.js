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
