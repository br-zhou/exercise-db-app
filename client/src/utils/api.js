/**
 *
 * @param {string} type
 * @param {string} path
 * @returns json data send from backend or null if an error occurs
 */
export const serverFetch = async (type, path) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`, {
    method: type,
  }).catch((reason) => {
    console.warn(reason);
    return null;
  });

  const data = await response.json();

  return data;
};
