import axios from "axios";

import {
  ROOT_URL,
  FETCH_FLOORS_AT,
  FETCH_FLOOR,
  ADD_FLOOR,
  EDIT_FLOOR,
  DELETE_FLOOR
} from "../constants/ActionTypes";

const URL = `${ROOT_URL}/api/floors`;
export function fetchFloorsAt(id, perPage, page) {
  const query = `/hospital=${id}`;
  const url = `${URL}${query}`;
  const config = {
    method: "get",
    url,
    params: { perPage, page }
  };
  const request = axios(config);

  return dispatch => {
    return request
      .then(({ data }) => {
        dispatch({
          type: FETCH_FLOORS_AT,
          payload: data
        });
        return { data };
      })
      .catch(({ message }) => {
        dispatch({
          type: FETCH_FLOORS_AT,
          payload: {
            err: message
          }
        });
        return message;
      });
  };
}
export function fetchFloor(id) {
  const query = `/id=${id}`;
  const url = `${URL}${query}`;
  const request = axios.get(url);

  return dispatch => {
    return request.then(({ data }) => {
      dispatch({
        type: FETCH_FLOOR,
        payload: data
      });
    });
  };
}
// post
export function addFloor(values, file) {
  const query = `/push`;
  const url = `${URL}${query}`;
  const config = {
    method: "post",
    url,
    data: file,
    params: values
  };
  const request = axios(config);

  return dispatch => {
    return request.then(({ data }) => {
      dispatch({
        type: ADD_FLOOR,
        payload: data
      });
      return data;
    });
  };
}
export function editFloor(id, values, file) {
  const query = `/update/id=${id}`;
  const url = `${URL}${query}`;
  const config = {
    method: "post",
    url,
    data: file,
    params: values
  };
  const request = axios(config);

  return dispatch => {
    return request
      .then(({ data }) => {
        dispatch({
          type: EDIT_FLOOR,
          payload: "SUCCESS"
        });
      })
      .catch(({ response }) => {
        return response.data.err;
      });
  };
}

// delete

export function deleteFloor(id, hospital_) {
  const query = `/delete/${id}`;
  const url = `${URL}${query}`;
  const config = {
    method: "delete",
    url,
    params: { hospital_ }
  };
  const request = axios(config);

  return dispatch => {
    return request
      .then(({ data }) => {
        dispatch({
          type: DELETE_FLOOR,
          payload: id
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
