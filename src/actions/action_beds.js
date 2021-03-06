import axios from "axios";

import {
  ROOT_URL,
  FETCH_BEDS_AT,
  FETCH_BED,
  ADD_BED,
  EDIT_BED,
  DELETE_BED
} from "../constants/ActionTypes";

const URL = `${ROOT_URL}/api/beds`;
export function fetchBedsAt(id, perPage, page) {
  const query = `/room=${id}`;
  const url = `${URL}${query}`;
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
          type: FETCH_BEDS_AT,
          payload: data
        });
        return { data };
      })
      .catch(({ message }) => {
        dispatch({
          type: FETCH_BEDS_AT,
          payload: {
            err: message
          }
        });
        return message;
      });
  };
}
export function fetchBed(id) {
  const query = `/id=${id}`;
  const url = `${URL}${query}`;
  const request = axios.get(url);

  return dispatch => {
    return request.then(({ data }) => {
      dispatch({
        type: FETCH_BED,
        payload: data
      });
    });
  };
}

// post
export function addBed(values, file) {
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
    return request
      .then(({ data }) => {
        dispatch({
          type: ADD_BED,
          payload: data
        });
        return data;
      })
      .catch(({ response }) => {
        return response.data;
      });
  };
}
export function editBed(id, values, file) {
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
          type: EDIT_BED,
          payload: "SUCCESS"
        });
      })
      .catch(({ response }) => {
        return response.data.err;
      });
  };
}

// delete

export function deleteBed(id) {
  const query = `/delete/${id}`;
  const url = `${URL}${query}`;
  const request = axios.delete(url);

  return dispatch => {
    return request.then(({ data }) => {
      dispatch({
        type: DELETE_BED,
        payload: id
      });
    });
  };
}
