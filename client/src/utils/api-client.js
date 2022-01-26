const client = (endpoint, customConfig = {}) => {
  const config = {
    method: "GET",
    withCredentials: true,
    ...customConfig,
  };

  return window
    .fetch(`http://localhost:5000/api/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export { client };
