import { service } from './service';

export default {
	ms(code: string){
		return service('/users', {
			headers: {
				code
			},
			method: 'GET'
		});
	},
	ms_oauth(){
		if (import.meta.env.DEV){
			return 'test_code';
		}
		throw new Error('mock only can running at dev env');
	}
};
