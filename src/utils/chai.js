const chai = {
  post: async (requester, url, data = null) => {
    return await requester.post(url).send(data);
  },
  get: async (requester, url, data = null) => {
    return await requester.get(url).send(data);
  },
  put: async (requester, url, data = null) => {
    return await requester.put(url).send(data);
  }
}

module.exports = chai
