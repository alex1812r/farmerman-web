import axios from 'axios';
import { BACKEND_URL } from '../constants/environments';

export const Api = axios.create({
	baseURL: BACKEND_URL
});
