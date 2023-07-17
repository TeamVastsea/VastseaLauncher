import React, {useEffect, useState } from 'react';
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api';
import api from '../api';


export default function Home(){
	const [code, setCode] = useState('');
	appWindow.listen('oauth', (e) => {
		const uri = e.payload as string;
		const url = new URL(uri);
		if (url.href.includes('https://mccteam.github.io/redirect.html#code=')){
			setCode(
				url.href.replace('https://mccteam.github.io/redirect.html#code=', '')
			);
			invoke('destory_oauth_window');
		}
	});
	const login = async () => {		
		await invoke('oauth');
	};
	useEffect(()=>{
		if (code){
			api.auth.ms(code)
				.then((res) => {
					console.log(res.data);
				});
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