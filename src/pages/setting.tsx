import React from 'react';
import { useAtom } from 'jotai';
import { settingAtom } from '../main';
import JavaSelect from '../components/java-select';
import { useMount } from 'ahooks';
import { invoke } from '@tauri-apps/api';
import MemorySelect from '../components/memory-select';
import ResolutionSetting from '../components/resolution';
import { About } from '../components/about';
import Links from '../components/links';
import { Close } from '../components/common/svg';
import { useNavigate } from 'react-router-dom';
export default function Setting(){
	const [setting, setSetting] = useAtom(settingAtom);
	const navigate = useNavigate();
	useMount(()=>{
		invoke<Setting>('get_setting')
			.then((setting)=>{
				setSetting(setting);
			});
	});
	const onJavaAdd = (java: Java) => {
		setSetting({
			...setting,
			java: [...setting['java']??[], java]
		});
	};
	const onJavaSelect = (path: string) => {
		setSetting({
			...setting,
			used_java: path
		});
	};
	const onMemoryChange = (memory: number) => {
		setSetting({...setting, memory});
	};
	const onResolutionChange = (type: 'width' | 'height', value: number) => {
		if (type === 'width'){
			setSetting({
				...setting,
				width: value
			});
		} else {
			setSetting({
				...setting,
				height: value
			});
		}
	};
	const onFullScreen = (fullScreen: boolean) => {
		setSetting({
			...setting,
			full_screen: fullScreen
		});
	};
	return (
		<div className="w-full h-full px-[12px] pt-[11px] pb-[13px]">
			<div className="relative flex w-full h-full rounded-xl bg-[rgba(255,255,255,0.15)] backdrop-blur-2lg overflow-hidden px-[30px] py-[15px]">
				<Close stroke='#fff' strokeWidth='1' className='absolute top-[10px] right-[10px] cursor-pointer' onClick={()=>navigate('/')} />
				<div className='w-[385px] h-full flex-grow-0 flex-shrink-0 basis-auto'>
					<div className='mb-6'>
						<h1 className='text-3xl leading-0 text-white font-Noto_Sans font-bold'>设置</h1>
					</div>
					<div className='flex gap-6 flex-col'>
						<JavaSelect setting={setting} onAdd={onJavaAdd} onSelect={onJavaSelect}/>
						<MemorySelect setting={setting} onChange={onMemoryChange} />
						<ResolutionSetting setting={setting} onChange={onResolutionChange} onFullScreen={onFullScreen} />
					</div>
				</div>
				<svg width="2" height="519" viewBox="0 0 2 519" fill="none" xmlns="http://www.w3.org/2000/svg" className='flex-grow-0 flex-shrink-0'>
					<path d="M1 1L1 518" stroke="white" strokeOpacity="0.5" strokeLinecap="round"/>
				</svg>
				<div className='pl-[38px] flex-auto flex flex-col'>
					<About />
					<Links />
				</div>
			</div>
		</div>
	);
}