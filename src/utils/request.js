import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// eslint-disable-next-line no-underscore-dangle
const requestService = axios.create({
  baseURL: apiUrl,
});

export default requestService;
