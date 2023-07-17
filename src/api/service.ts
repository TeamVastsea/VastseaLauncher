import axios from 'axios';
export const baseUrl = 'http://main.vastsea.cc:9527';
export const service = axios.create({
	baseURL: baseUrl,
});

service.interceptors.response.use((value) => {
	return value.data;
}, (err)=>{
	return err;
});