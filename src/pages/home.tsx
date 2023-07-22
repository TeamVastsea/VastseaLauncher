import React from 'react';
import { Account } from '../components/account';

export default function Home(){
	return (
		<div className='w-full h-full relative px-16'>
			<div className='pt-[39.4px] pb-[54px] h-full flex flex-col'>
				<img src='img/logo.svg' className='w-[200px] h-[35px]'/>
				<Account />
			</div>
		</div>
	);
}