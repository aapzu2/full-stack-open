import axios from 'axios'
const baseUrl = '/api/persons'

export const getAll = () => axios.get(baseUrl)

export const create = (newObject) => axios.post(baseUrl, newObject)

export const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

export const remove = (id) => axios.delete(`${baseUrl}/${id}`)
