import React, {useEffect, useState } from 'react';
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api';
import {debug} from '../api/log';


export default function Home(){
	const [code, setCode] = useState('');
	appWindow.listen('oauth', (e) => {
		const uri = e.payload as string;
		const url = new URL(uri);
		if (url.href.includes('https://mccteam.github.io/redirect.html#code=')){
			setCode(
				url.href.replace('https://mccteam.github.io/redirect.html#code=', '')
			);
			invoke('auth_window_destroy').then(() => {
				debug('destroyed');
			});
		}
	});
	const login = async () => {		
		await invoke('auth_window_create');
	};
	useEffect(()=>{
		if (code){
			invoke('auth_credential_get', {code: code}).then((res) => console.log(res));
		}
	}, [code]);
}