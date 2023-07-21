import React from 'react';
import { News } from './news/news';



export default function Home(){
	return (
		<div className="w-full h-full flex flex-col gap-8">
			<div className='flex flex-shrink-0 justify-center max-w-[800px] w-full mx-auto h-[300px] bg-[url("https://via.placeholder.com/800x300")]'>
				<button className='
					w-40 h-14 bg-blue-500 rounded-md text-white self-end translate-y-1/2
					hover:bg-blue-400 active:bg-blue-600 transition-all
				'>开始游戏</button>
			</div>
			<div className='max-w-xl w-full mx-auto'>
				<News/>
			</div>
		</div>
	);
}