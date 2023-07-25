import React from 'react';
import { useAtom } from 'jotai';
import { settingAtom } from '../main';
import JavaSelect from '../components/java-select';
import { useMount } from 'ahooks';
import { invoke } from '@tauri-apps/api';
export default function Setting(){
	const [setting, setSetting] = useAtom(settingAtom);
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
	return (
		<div className="w-full h-full px-[12px] pt-[11px] pb-[13px]">
			<div className="w-full h-full rounded-xl bg-[rgba(255,255,255,0.15)] backdrop-blur-2lg overflow-hidden px-[30px] py-[15px]">
				<div className='w-[385px] h-full'>
					<div className='mb-6'>
						<h1 className='text-3xl leading-0 text-white font-NotoSans-Bold font-bold'>设置</h1>
					</div>
					<JavaSelect setting={setting} onAdd={onJavaAdd} onSelect={onJavaSelect}/>
				</div>
			</div>
		</div>
	);
}