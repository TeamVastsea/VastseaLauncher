import {fetch} from '@tauri-apps/api/http';

export interface MojangError {
	path: string;
	error_message: string
}
export interface SkinResponse {
	id: string;
	name: string;
}

export interface SkinResponse {
	id: string;
	name: string;
	legacy: string;
	properties: [
		{
			name: string;
			signature: boolean;
			value: string;
		}
	]
}
export interface SkinValue {
	timestamp: number;
	profile: string;
	profileName: string;
	signatureRequired: boolean;
	textures: {
		SKIN?:{
			url: string
			metadata: {
				model?: 'slim'
			}
		};
		CAPE?: {
			url: string;
		}
	}
}


export default {
	uuid(name: string): Promise<SkinResponse>{
		return new Promise((resolve,reject) => {
			fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`, {
				method: 'GET'
			})
				.then(({status, data}) => {
					if (status > 399){
						reject(data as MojangError);
					} else {
						resolve(data as SkinResponse);
					}
				});
		});
	},
	skin(uuid: string): Promise<SkinResponse>{
		return new Promise((resolve,reject)=>{
			fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}?unsigned=false`)
				.then(({status, data})=>{
					if (status > 399){
						reject(data as MojangError);
					} else {
						resolve(data as SkinResponse);
					}
				});
		});
	},
	decrypt(b64: string): SkinValue{
		return JSON.parse(atob(b64));
	}
};