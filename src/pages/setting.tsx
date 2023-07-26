import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { settingAtom } from '../main';
import JavaSelect from '../components/java-select';
import { useDebounceFn, useMount } from 'ahooks';
import { invoke } from '@tauri-apps/api';
export default function Setting(){
	const [setting, setSetting] = useAtom(settingAtom);
	const [progress, setProgress] = useState(0);
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
	const onMemoryChange = useDebounceFn((e: React.FormEvent<HTMLDivElement>) => {
		const ele = e.target as HTMLElement;
		if (ele.innerText !== ''){
			const memory = Math.min(
				Number(ele.innerText),
				setting.max_memory ?? Number.MAX_SAFE_INTEGER
			);
			setSetting({...setting, memory: memory});
			document.execCommand('selectAll', false, '');
			document.getSelection()?.collapseToEnd();
		}
	}, {wait: 100});
	useEffect(()=>{
		setProgress(
			parseInt(
				((setting.memory ?? 0) / (setting.max_memory ?? 1) * 100).toString()
			)
		);
	}, [setting, setting.memory, setting.max_memory]);
	return (
		<div className="w-full h-full px-[12px] pt-[11px] pb-[13px]">
			<div className="w-full h-full rounded-xl bg-[rgba(255,255,255,0.15)] backdrop-blur-2lg overflow-hidden px-[30px] py-[15px]">
				<div className='w-[385px] h-full'>
					<div className='mb-6'>
						<h1 className='text-3xl leading-0 text-white font-NotoSans-Bold font-bold'>设置</h1>
					</div>
					<div className='flex gap-6 flex-col'>
						<JavaSelect setting={setting} onAdd={onJavaAdd} onSelect={onJavaSelect}/>
						<div className='flex flex-col items-start gap-1 text-white'>
							<span className='font-Noto_Sans font-[600] text-base leading-none'>运行内存</span>
							<div className='flex gap-6 items-center'>
								<div className='flex gap-[10px] items-center'>
									<div 

										contentEditable
										suppressContentEditableWarning
										className='
											flex min-w-[36px] min-h-[36px] py-2 px-4 rounded-md border-2 border-solid border-[rgba(255,255,255,0.5)]
											outline-none
										'
										onInput={onMemoryChange.run}
									>
										{setting.memory}
									</div>
									<span>MB</span>
								</div>
								<div className='flex gap-[3px] flex-col h-fit '>
									<div className='w-[180px] h-3 bg-[rgba(255,255,255,0.5)] outline outline-1 outline-[rgba(255,255,255,0.5)] rounded-[2px]'>
										<div className={
											'h-full bg-white rounded-[2px]'
										} style={
											{
												width: `${progress}%`
											}
										}></div>
									</div>
									<span className='text-xs mt-[3px]'>分配 <span className='font-semibold'>{setting.memory} / {setting.max_memory}</span> MB</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}