import axios from "axios";

import {
  ROOT_URL,
  FETCH_PATIENTS,
  FETCH_FREE_PATIENTS,
  FETCH_PATIENT,
  FETCH_PATIENTS_SEACHED,
  FETCH_PATIENTS_AT,
  ADD_PATIENT,
  EDIT_PATIENT,
  DELETE_PATIENT
} from "../constants/ActionTypes";

const URL = `${ROOT_URL}/api/patients`;
export function fetchPatients(perPage, page) {
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
          type: FETCH_PATIENTS,
          payload: data
        });
        return { data };
      })
      .catch(({ message }) => {
        dispatch({
          type: FETCH_PATIENTS,
          payload: {
            err: message
          }
        });
        return message;
      });
  };
}
export function fetchFreePatients() {
  const query = `/free`;
  const url = `${URL}${query}`;
  const request = axios.get(url);

  return dispatch => {
    return request.then(({ data }) => {
      dispatch({
        type: FETCH_FREE_PATIENTS,
        payload: data
      });
    });
  };
}
export function fetchPatient(id) {
  const query = `/id=${id}`;
  const url = `${URL}${query}`;
  const request = axios.get(url);

  return dispatch => {
    return request.then(({ data }) => {
      dispatch({
        type: FETCH_PATIENT,
        payload: data
      });
      return data;
    });
  };
}
export function fetchPatientsSearched(searchByName, perPage, page) {
  const query = `/searchByName=${searchByName}`;
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
          type: FETCH_PATIENTS_SEACHED,
          payload: data
        });
        return data;
      })
      .catch(({ message }) => {
        dispatch({
          type: FETCH_PATIENTS_SEACHED,
          payload: { err: message }
        });
        return message;
      });
  };
}
export function fetchPatientsAt(id, perPage, page) {
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
          type: FETCH_PATIENTS_AT,
          payload: data
        });
        return { data };
      })
      .catch(({ message }) => {
        dispatch({
          type: FETCH_PATIENTS_AT,
          payload: {
            err: message
          }
        });
        return message;
      });
  };
}
// post
export function addPatient(values, file) {
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
          type: ADD_PATIENT,
          payload: data
        });
        return data;
      })
      .catch(({ response }) => {
        return response.data;
      });
  };
}
export function editPatient(id, values, file) {
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
    console.log(request);
    return request
      .then(({ data }) => {
        console.log(request);

        dispatch({
          type: EDIT_PATIENT,
          payload: "SUCCESS"
        });
      })
      .catch(({ response }) => {
        console.log(response.data.err);
        return response.data.err;
      });
  };
}

// delete

export function deletePatient(id) {
  const query = `/delete/${id}`;
  const url = `${URL}${query}`;
  const request = axios.delete(url);

  return dispatch => {
    return request.then(({ data }) => {
      dispatch({
        type: DELETE_PATIENT,
        payload: id
      });
    });
  };
}
