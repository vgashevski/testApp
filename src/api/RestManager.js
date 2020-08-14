const defaultPostHeaders = [
  {
    name: 'Content-Type',
    value: 'application/json',
  },
];

const RestManager = {
  request: async (url, method = 'GET', headers = [...defaultPostHeaders], isEssential = true) => {
    const options = {
      method,
      headers: RestManager.getHeaders(headers),
      mode: 'cors',
      cache: 'default',
    };
    const json = await fetch(url, options).then((response) => {
      return RestManager.tryResponseJSON(response);
    });

    return json;
  },

  tryResponseJSON: async (response) => {
    try {
      return await response.json();
    } catch (e) {
      console.log('tryResponseJSON: ', e);
      return {};
    }
  },

  getHeaders(additionalHeaders) {
    let headers = new Headers();
    additionalHeaders.forEach((item) => {
      headers.append(item.name, item.value);
    });
    return headers;
  },
};

export default RestManager;
