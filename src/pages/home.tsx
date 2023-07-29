import React from 'react';
import { Account } from '../components/account';
import { NewsPaper } from '../components/common/svg';
import { Toaster } from 'react-hot-toast';

export default function Home(){
	return (
		<div className='flex flex-grow w-full px-16 pt-[39.4px] pb-[54px] relative'>
			<div className='h-full flex flex-col flex-grow'>
				<img src='img/logo.svg' className='w-[200px] h-[35px]'/>
				<Account />
			</div>
			<div className='w-12 h-12 mb-0 mt-auto bg-[rgba(255,255,255,0.25)] backdrop-blur-2xl shadow-[0px_2px_2px_rgba(0,0,0,.10)] rounded-[10px]'>
				<NewsPaper fill='#fff' className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2' />
			</div>
			<Toaster containerStyle={{
				inset: '0',
				position: 'absolute',
				width: 'calc(800px - 32px)',
				height: 'calc(600px - 108px)',
				margin: 'auto'
			}} />
		</div>
	);
}