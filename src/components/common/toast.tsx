import { toast } from 'react-hot-toast';
import React from 'react';
import { Warning } from './svg';

const useDate = () => {
	const date = new Date();
	return () => `${date.getFullYear().toString().slice(0,2)}.${date.getMonth()+1}.${date.getDay()+1}`;
};
const LinearGradientBorder = () => {
	return (
		<svg
			style={{
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: 0,
				left: 0
			}}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_bd_28_157)">
				<rect
					x="0"
					y="1px"
					width="100%"
					height="100%"
					rx="12px"
					stroke="url(#paint1_linear_28_157)"
					shapeRendering="crispEdges"
				/>
			</g>
			<defs>
				<linearGradient
					id="paint1_linear_28_157"
					x1="100%"
					y1="0%"
					x2="0%"
					y2="50%"
				>
					<stop stopColor="white" stopOpacity="0.25" />
					<stop offset="0.5" stopColor="white" stopOpacity="0" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export const useToast = (message: string, background: string) => {
	const date = useDate();
	return toast.custom(() => {
		return (
			<div className='overflow-hidden w-[250px]'>
				<div className='
					flex flex-col gap-[6px] p-3 rounded-xl backdrop:blur-2lg shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)] border-solid overflow-hidden
					relative
				'
				style={{
					background,
				}}>
					<div className='flex items-center gap-[6px] text-white'>
						<Warning className='' fill='#fff' />
						<span className='font-Noto_Sans text-base font-bold'>警告</span>
					</div>
					<span className='text-white'>
						{message}
					</span>
					<span className='text-[rgba(255,255,255,0.50)] text-sm leading-none font-Noto_Sans font-normal'>{date()}</span>
					<LinearGradientBorder />
				</div>
			</div>
		);
	}, {
		position: 'bottom-right'
	});
};

export const useWarning = (message: string) => useToast(message, 'linear-gradient(180deg, rgba(102, 207, 255, 0.25) 0%, rgba(255, 0, 0, 0.25) 0.01%, rgba(255, 255, 255, 0.06) 100%)');

export const useInfo = (message: string) => useToast(message, 'linear-gradient(180deg, rgba(102, 207, 255, 0.25) 0%, rgba(255, 255, 255, 0.06) 100%)');