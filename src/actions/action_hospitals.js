import axios from "axios";

import {
  ROOT_URL,
  FETCH_HOSPITALS,
  FETCH_HOSPITAL,
  ADD_HOSPITAL,
  EDIT_HOSPITAL,
  DELETE_HOSPITAL,
  RESET_HOSPITAL_FORM
} from "../constants/ActionTypes";

const URL = `${ROOT_URL}/api/hospitals`;
// get
export function fetchHospitals(perPage, page) {
  const url = `${URL}`;
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
          type: FETCH_HOSPITALS,
          payload: data
        });
        return { data };
      })
      .catch(({ message }) => {
        dispatch({
          type: FETCH_HOSPITALS,
          payload: {
            err: message
          }
        });
        return message;
      });
  };
}
export function fetchHospital(id) {
  const query = `/id=${id}`;
  const url = `${URL}${query}`;
  const request = axios.get(url);

  return dispatch => {
    return request
      .then(({ data }) => {
        dispatch({
          type: FETCH_HOSPITAL,
          payload: data
        });
        return data;
      })
      .catch(err => {
        dispatch({
          type: FETCH_HOSPITAL,
          payload: {
            err: err
          }
        });
        return err;
      });
  };
}
// post
export function addHospital(values, file) {
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
          type: ADD_HOSPITAL,
          payload: "SUCCESS"
        });
        return { data };
      })
      .catch(({ response }) => {
        dispatch({
          type: ADD_HOSPITAL,
          payload: "FAIL"
        });
        return response.data.err;
      });
  };
}
export function editHospital(id, values, file) {
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
          type: EDIT_HOSPITAL,
          payload: "SUCCESS"
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

// delete

export function deleteHospital(id) {
  const query = `/delete/${id}`;
  const url = `${URL}${query}`;
  const request = axios.delete(url);

  return dispatch => {
    return request
      .then(({ data }) => {
        dispatch({
          type: DELETE_HOSPITAL,
          payload: id
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function resetHospitalForm() {
  return dispatch => {
    dispatch({
      type: RESET_HOSPITAL_FORM,
      payload: "reset"
    });
  };
}
