import axios from 'axios';
import {SERVER_URL} from '../constants';

export const createNewList = (listID) =>
  axios.post(`${SERVER_URL}/lists`, {
    identification: listID
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    console.log(error);
  });

export const createBabyName = ({name, listID}) =>
    axios.post(`${SERVER_URL}/babies`, {
      name,
      list_id: listID
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });

export const getListsByIdentification = (listID) =>
    axios.get(`${SERVER_URL}/lists?identification=${listID}`)
        .then((response) => response)

export const getLists = () =>
    axios.get(`${SERVER_URL}/lists`)
        .then((response) => response)

export const getBabies = (listID) =>
        axios.get(`${SERVER_URL}/babies?list_id=${listID}`)
            .then((response) => response)

