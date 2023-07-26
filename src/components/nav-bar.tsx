import React from 'react';
import { appWindow } from '@tauri-apps/api/window';
export default function NavBar(){
	const onMin = async () => {
		console.log('on click');
		await appWindow.minimize();
	};
	const onClose = async () => {
		await appWindow.close();
	};
	return (
		<div className="
			flex w-full h-[30px] font-Instrument_sans text-white bg-[rgba(0,0,0,.25)] backdrop-blur-2lg
			text-xs leading-1 items-center rounded-t-xl
		">
			<div className='flex-grow-1 flex-shrink-0'>
				<span className='ml-3'>VASTSEA Launcher</span>
			</div>
			<div className='flex ml-auto mr-0'>
				<img src='img/min.svg' className='cursor-pointer' onClick={onMin} />
				<img src="img/close.svg" className='cursor-pointer' onClick={onClose} />
			</div>
		</div>
	);
}