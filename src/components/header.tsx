import React from 'react';
export function Header(){
	return (
		<div
			className='w-full h-14'
		>
			<div className='w-fit h-full mr-0 ml-auto flex'>
				<div className='w-14 h-full'>
					<img src="https://via.placeholder.com/56" alt=""/>
				</div>
				<div className=' max-w-[64px] w-full h-full dark:text-white'>
					<div className='truncate'>
						<span>GaoNeng-wWw</span>
					</div>
					<span className='w-fit mx-auto block'>已登录</span>
				</div>
			</div>
		</div>
	);
}