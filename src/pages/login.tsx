import React from 'react';
import { invoke } from '@tauri-apps/api';


export default function Login(){
	const login = async () => {		
		await invoke('auth_window_create');
	};
	
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