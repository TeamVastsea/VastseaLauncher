import React, {useEffect, useState } from 'react';
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api';
import {debug} from '../api/log';


export default function Login(){
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
	return (
		<div className='mx-auto my-auto w-52 h-52 flex flex-col'>
			<div className='
				w-full h-11 flex justify-center items-center rounded-md dark:bg-gray-700 my-auto
				cursor-pointer dark:hover:bg-gray-600 dark:active:bg-gray-900 transition-all gap-2
			' onClick={login}>
				<span className='dark:text-white text-center'>Microsoft 登录</span>
			</div>
		</div>
	);
}