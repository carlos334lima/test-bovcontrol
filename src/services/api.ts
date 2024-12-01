import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

export const url_get_checklist =
  "http://challenge-front-end.bovcontrol.com/v1/checkList";

export const useDefaultPostAPI = (url: string, payload: any) =>
  axios
    .post(url, payload, {
      headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    })
    .then((response) => response)
    .catch((error) => error);

export const useDefaultPutAPI = (url: string, payload: any) =>
  axios
    .put(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    })
    .then((response) => response)
    .catch((error) => error);

export const useDefaultGetAPI = (url: string) =>
  axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    })
    .then((response) => response)
    .catch((error) => error);
