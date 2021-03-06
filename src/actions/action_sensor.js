import axios from "axios";

import {
  ROOT_URL,
  FETCH_SENSORS,
  FETCH_FREE_SENSORS,
  FETCH_SENSOR,
  FETCH_SENSORS_AT,
  ADD_SENSOR,
  EDIT_SENSOR,
  DELETE_SENSOR
} from "../constants/ActionTypes";

const URL = `${ROOT_URL}/api/sensors`;

export function fetchSensors(perPage, page) {
  const url = `${URL}`;
  const config = {
    method: "get",
    url,
    params: {
      perPage,
      page
    }
  };
  const request = axios(config);

  return dispatch => {
    return request
      .then(({ data }) => {
        dispatch({
          type: FETCH_SENSORS,
          payload: data
        });
        return { data };
      })
      .catch(({ message }) => {
        dispatch({
          type: FETCH_SENSORS,
          payload: {
            err: message
          }
        });
        return message;
      });
  };
}
export function fetchFreeSensors() {
  const query = `/free`;
  const url = `${URL}${query}`;

  const request = axios.get(url);

  return dispatch => {
    return request.then(({ data }) => {
      dispatch({
        type: FETCH_FREE_SENSORS,
        payload: data
      });
    });
  };
}
export function fetchSensor(id) {
  const query = `/id=${id}`;
  const url = `${URL}${query}`;

  const request = axios.get(url);

  return dispatch => {
    return request.then(({ data }) => {
      dispatch({
        type: FETCH_SENSOR,
        payload: data
      });
    });
  };
}
export function fetchSensorsAt(id, perPage, page) {
  const query = `/hospital`;
  const url = `${URL}${query}`;
  const config = {
    method: "get",
    url,
    params: {
      id,
      perPage,
      page
    }
  };
  const request = axios(config);

  return dispatch => {
    return request
      .then(({ data }) => {
        dispatch({
          type: FETCH_SENSORS_AT,
          payload: data
        });
        return { data };
      })
      .catch(({ message }) => {
        dispatch({
          type: FETCH_SENSORS_AT,
          payload: {
            err: message
          }
        });
        return message;
      });
  };
}
// post
export function addSensor(values) {
  const query = `/push`;
  const url = `${URL}${query}`;
  const request = axios.post(url, values);

  return dispatch => {
    return request
      .then(({ data }) => {
        dispatch({
          type: ADD_SENSOR,
          payload: data
        });
        return data;
      })
      .catch(({ response }) => {
        return response.data;
      });
  };
}
export function editSensor(id, values) {
  const query = `/update/id=${id}`;
  const url = `${URL}${query}`;
  const request = axios.post(url, values);

  return dispatch => {
    return request
      .then(({ data }) => {
        dispatch({
          type: EDIT_SENSOR,
          payload: "SUCCESS"
        });
      })
      .catch(({ response }) => {
        return response.data.err;
      });
  };
}

// delete

export function deleteSensor(id) {
  const query = `/delete/${id}`;
  const url = `${URL}${query}`;
  const request = axios.delete(url);

  return dispatch => {
    return request.then(({ data }) => {
      dispatch({
        type: DELETE_SENSOR,
        payload: id
      });
    });
  };
}
