// import { service } from './service';
import { fetch } from '@tauri-apps/api/http';
import { baseUrl } from './service';

export default {
	ms(code: string){
		return fetch(baseUrl + '/users', {
			query: {
				code
			},
			method: 'GET'
		});
		// return service.get('/users', {
		// 	params: new URLSearchParams({code})
		// });
	}
};
