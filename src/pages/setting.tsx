import React, { useState } from 'react';
import { useMount } from 'ahooks';
import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/dialog';
import { Add, Expand } from '../components/common/svg';
import { useAtom } from 'jotai';
import { settingAtom } from '../main';
export default function Setting(){
	const [setting, setSetting] = useAtom(settingAtom);
	const [expand, setExpand] = useState(false);
	useMount(async ()=>{
		invoke<Setting>('get_setting')
			.then((setting) => {
				setSetting(setting);
			});
	});
	const getVersion = (path: string) => {
		return /(jdk|jre)-(?<version>\d+\.\d+\.\d+)/gim.exec(path)?.groups?.version;
	};
	const getExec = (path: string) => {
		if (path.includes('exe')){
			return /(?<filename>[^\\/]+)$/gim.exec(path)?.groups?.filename;
		}
	};
	const addJava = async () => {
		const select = await open({
			filters: [
				{
					name: 'exe',
					extensions: ['exe']
				}
			]
		}) as string;
		const version = getVersion(select);
		const exe = getExec(select);
		if (version && exe){
			setSetting({
				...setting,
				java: [...setting['java']??[], {version,exe, path: select}]
			});
		}
	};
	const selectJava = (path: string) => {
		setSetting({
			...setting,
			used_java: path
		});
	};
	const SelectItem = () => {
		return (
			<>
				{setting['java']?.map((v,i) => <li onClick={()=>selectJava(v.path)} key={i} className='first:mt-[10px] font-Noto_Sans truncate'>{v.version} @ {v.path}</li>)}
				<li className='font-Noto_Sans flex items-center content-center' onClick={addJava}>添加路径...</li>
			</>
		);
	};
	const Select = () => {
		return (
			<ul className='flex flex-col gap-[10px] max-w-[calc(100%_-_12px_-_10px)]'>
				<SelectItem />
			</ul>
		);
	};
	return (
		<div className="w-full h-full px-[12px] pt-[11px] pb-[13px]">
			<div className="w-full h-full rounded-xl bg-[rgba(255,255,255,0.15)] backdrop-blur-2lg overflow-hidden px-[30px] py-[15px]">
				<div className='w-[385px] h-full'>
					<div className='mb-6'>
						<h1 className='text-3xl leading-0 text-white font-NotoSans-Bold font-bold'>设置</h1>
					</div>
					<div className='flex flex-col items-start gap-1 text-white'>
						<span className='font-Noto_Sans font-[600] text-base leading-none'>Java路径</span>
						<div className='
						min-h-[36px] max-w-[350px] w-auto h-auto py-2 px-[10px]
						rounded-md border border-solid border-white cursor-pointer
						' onClick={()=>setExpand(!expand)}>
							<div className='flex items-center gap-[10px]' onClick={() => setting['java']?.length ?? addJava()}>
								<div className='flex-grow-0 flex-shrink w-full overflow-hidden'>
									{
										setting['java']?.length ? <p className='truncate'>
											{getVersion(setting['used_java'] ?? '') ?? null} @ {setting['used_java']}
										</p> : <p className='truncate'>未找到Java，可手动添加路径</p>
									}
									
								</div>
								<div>
									{
										setting['java']?.length ? <Expand fill='#fff' className='flex-shrink-0'/> : <Add fill='#fff' className='flex-shrink-0' />
									}
								</div>
							</div>
							{
								expand ? (
									<Select />
								) : null
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}