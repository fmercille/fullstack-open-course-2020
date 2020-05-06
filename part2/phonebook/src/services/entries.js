import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseURL)
}

const create = newObject => {
  return axios.post(baseURL, newObject)
}

const deleteEntry = id => {
  return axios.delete(`${baseURL}/${id}`, id)
}

export default {
  getAll,
  create,
  delete: deleteEntry
}