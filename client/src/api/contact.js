import axios from './axios.js'

//Para consultar los contactos con todos sus telefonos
export const getContactsRequest = () => axios.get('/contact/phones');

export const getContactRequest = (id) =>axios.get(`/contact/${id}`);

export const createContactRequest = (contact) => axios.post('/contact', contact);

export const updateContactRequest = (contact) => axios.put(`/contact/${contact.id}`, contact);

export const deleteContactRequest = (id) => axios.delete(`/contact/${id}`);

