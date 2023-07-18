import { fetch, FetchOptions } from '@tauri-apps/api/http';
export const baseUrl = import.meta.env.DEV ? 'http://localhost:3000' : 'http://main.vastsea.cc:9527';
export const service = (url:string, option:FetchOptions) => {
	const requestUrl = `${baseUrl}${url}`;
	return new Promise((resolve,reject) => {
		fetch(requestUrl, option)
			.then((value) => {
				if (value.status > 399){
					reject(value);
				} else {
					resolve(value);
				}
			})
			.catch((reason) => {
				reject(reason);
			});
	});
};