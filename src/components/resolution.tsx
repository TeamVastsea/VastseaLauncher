import React, { useEffect, useState } from 'react';
import { Close } from './common/svg';
import { useDebounceFn } from 'ahooks';
export default function Resolution(
	props: {
		setting: Partial<Setting>,
		onChange: (type: 'width' | 'height', value: number)=>void,
		onFullScreen: (fullscreen:boolean) => void
	}
){
	const {setting, onChange} = props;
	const [width, setWidth] = useState(setting.width);
	const [height, setHeight] = useState(setting.height);
	const [fullScreen, setFullScreen] = useState(setting.full_screen ?? false);
	const onResolutionChange = useDebounceFn((type: 'width' | 'height', e: React.FormEvent<HTMLDivElement>) => {
		const ele = e.target as HTMLElement;
		if (ele.innerText !== ''){
			const value = Number(ele.innerText);
			if (type === 'width'){
				setWidth(
					value
				);
			}
			if (type === 'height'){
				setHeight(
					value
				);
			}
			onChange(type, value);
			document.execCommand('selectAll', false, '');
			document.getSelection()?.collapseToEnd();
		}
	}, {wait: 100}).run;
	useEffect(()=>{
		setWidth(setting.width);
		setHeight(setting.height);
		setFullScreen(setting.full_screen ?? false);
	}, [setting.width, setting.height, setting.full_screen]);
	return (
		<div className='flex flex-col items-start gap-1 text-white'>
			<span className='font-Noto_Sans text-base leading-none'>游戏运行分辨率</span>
			<div className='flex items-center gap-6'>
				<div className='flex items-center gap-3'>
					<div 

						contentEditable
						suppressContentEditableWarning
						className='
							flex min-w-[36px] min-h-[36px] py-2 px-4 rounded-md border-2 border-solid border-[rgba(255,255,255,0.5)]
							outline-none
						'
						onInput={(e)=>onResolutionChange('width', e)}
					>
						{width}
					</div>
					<Close stroke='white' strokeWidth='2' />
					<div 

						contentEditable
						suppressContentEditableWarning
						className='
							flex min-w-[36px] min-h-[36px] py-2 px-4 rounded-md border-2 border-solid border-[rgba(255,255,255,0.5)]
							outline-none
						'
						onInput={(e)=>onResolutionChange('height', e)}
					>
						{height}
					</div>
					<span className='text-sm'>px</span>
				</div>
				<div className='flex justify-center gap-3'>
					<svg 
						width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer'>
						{
							fullScreen ? (
								<>
									<rect width="18" height="18" rx="4" fill="#00A4EF"/>
									<path d="M7 13.4L3 9.4L4.4 8L7 10.6L13.6 4L15 5.4L7 13.4Z" fill="white"/>
								</>
							) : (
								<rect x="1" y="1" width="16" height="16" rx="3" stroke="white" strokeOpacity="0.5" strokeWidth="2"/>
							)
						}
					</svg>
					<span
						className=' select-none font-Noto_Sans text-base leading-none cursor-pointer'
						onClick={() => {
							setFullScreen(!fullScreen);
							props.onFullScreen(!fullScreen);
						}}
					>
						全屏
					</span>
				</div>
			</div>
		</div>
	);
}