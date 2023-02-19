export const RequestMethod = {
  GET: `GET`,
  POST: `POST`,
  DELETE: `DELETE`,
  PUT: `PUT`,
};

export async function sendRequest(path = "", data = {}, requestMethod = RequestMethod.GET) {
  const response = await fetch(`http://127.0.0.1:3001/${path}`, {
    method: requestMethod,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: requestMethod != RequestMethod.GET? JSON.stringify(data) : null,
  });
  if (requestMethod == RequestMethod.GET) {
    return response.json();
  }
  return null;
}