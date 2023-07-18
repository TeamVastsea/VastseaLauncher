import React from 'react';
import { Header } from '../components/header';
import SkinView from '../components/common/skinview';


export default function Home(){
	const name = 'Snowball_233';
	const skeleton = new Array(10).fill(0);
	return (
		<div className="w-full h-full">
			<Header />
			<div className='flex justify-center'>
				<div className='max-w-md w-full h-[300px] rounded-lg pb-4 dark:bg-gray-600 relative overflow-scroll overflow-x-hidden'>
					<div className="sticky top-0 dark:bg-gray-600 py-4 z-10 ">
						<h1 className='text-2xl dark:text-white text-center'>Feature</h1>
					</div>
					<div className='w-full flex-auto px-2 mt-4 flex gap-2 flex-col overflow-hidden'>
						{
							skeleton.map((v,i)=>(
								<div className='w-full h-10 dark:bg-gray-500 rounded-md px-2 flex items-center gap-2' key={i}>
									<div className='relative'>
										<input type="checkbox" id={`checkbox-${i}`} className={
											`
										peer
										grid place-content-center appearance-none m-0 ring-2 ring-indigo-600 transition-all
										before:content[''] w-5 h-5 before:bg-red-500 checked:bg-indigo-600
										`
										} />
										<div className='
											absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50 peer-checked:scale-100 peer-checked:opacity-100 transition-all
											dark:peer-checked:text-white
										'>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-3.5 w-3.5"
												viewBox="0 0 20 20"
												fill="currentColor"
												stroke="currentColor"
												strokeWidth="1"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												></path>
											</svg>
										</div>
									</div>
									<label htmlFor={`checkbox-${i}`}>feature-{i}</label>
								</div>
							))
						}
						
					</div>
				</div>
				<SkinView name={name} width={300} height={300} background='transparent' walk control/>
			</div>
		</div>
	);
}