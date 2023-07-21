import React from 'react';
import { News } from './news/news';
import { useNavigate } from 'react-router-dom';



export default function Home(){
	const navigate = useNavigate();
	return (
		<div className="w-full h-full flex flex-col gap-8">
			<div className='flex flex-shrink-0 justify-center max-w-[800px] w-full mx-auto h-[300px] bg-[url("https://via.placeholder.com/800x300")]'>
				<button className='
					ml-8 w-40 h-14 bg-blue-500 rounded-l-md rounded-r-none text-white self-end translate-y-1/2
					hover:bg-blue-400 active:bg-blue-600 transition-all
				'>开始游戏</button>
				
				<button 
					className='min-w-6 h-14 bg-blue-500 rounded-tl-none rounded-bl-none rounded-md text-white self-end translate-y-1/2
					hover:bg-blue-400 active:bg-blue-600 transition-all px-2'
					onClick={()=>navigate('/setting')}
				>
					<img src="public/img/setting.svg" className='mx-auto w-4 h-4' />
				</button>
			</div>
			<div className='max-w-xl w-full mx-auto'>
				<News/>
			</div>
		</div>
	);
}