import React, { useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import { Expand, Add } from './common/svg';
export default function JavaSelect(props: {setting: Partial<Setting>, onAdd: (java: Java) => void, onSelect: (path: string) => void}){
	const {setting, onAdd, onSelect} = props;
	const [expand, setExpand] = useState(false);
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
			onAdd({version,exe,path: select});
		}
	};
	const selectJava = (path: string) => {
		onSelect(path);
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
		<div className='flex flex-col items-start gap-1 text-white'>
			<span className='font-Noto_Sans text-base leading-none'>Java路径</span>
			<div className='
						min-h-[36px] max-w-[350px] w-auto h-auto py-2 px-[10px]
						rounded-md border-2 border-solid border-[rgba(255,255,255,0.5)] cursor-pointer
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
	);
}