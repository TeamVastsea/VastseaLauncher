import React from 'react';
import {Microsoft, Play, Warning} from './common/svg';
import Button from './common/button';
import { Setting } from './common/svg/setting';
export function Account(){
	return (
		<div className='
			flex flex-col gap-6 w-[220px] rounded-xl mt-auto mb-0 p-6 min-w-[242px]
			border border-white bg-[rgba(255,255,255,0.25)] backdrop-blur-2xl shadow-[0px_2px_2px_rgba(0,0,0,.10)]
			'>
			<div className='text-center'>
				<Warning className='mx-auto w-16 h-16 mb-3' fill='#fff' />
				{/* <img src="img/warning.svg" className='' /> */}
				<p className='text-sm leading-1 text-white font-Source_man'>
					你还未添加过任何账号
				</p>
				<p className='text-sm leading-1 text-white font-Source_man'>
					请绑定你的 <span className='font-Instrument_sans not-italic'>Microsoft</span> 账号
				</p>
			</div>
			<div className='w-full flex justify-center'>
				<Button text='添加账号' icon={<Microsoft />} shadow='md' className='mx-auto'/>
			</div>
			<hr className='bg-white w-[172px] mx-auto' />
			<div className='mx-auto max-w-[172px] w-full flex justify-center p-3 bg-[#00A4EF] rounded-[10px]'>
				<Button text='启动游戏' icon={<Play fill='#fff' />} shadow='md' className='rounded-r-none font-sans px-0 py-0 bg-transparent text-white '/>
				<div className='w-px h-full bg-white mx-2'></div>
				<Button icon={<Setting fill='#fff' />} shadow='md' className='rounded-l-none bg-transparent px-0 py-0'/>
			</div>
		</div>
	);
}