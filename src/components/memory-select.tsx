import React, {useEffect, useState} from 'react';
import { useDebounceFn} from 'ahooks';
export default function MemorySelect(props: {setting: Partial<Setting>, onChange: (memory: number)=>void}){
	const {setting, onChange} = props;
	const [progress, setProgress] = useState(0);
	const [memory, setMemory] = useState(setting.memory??4096);
	console.log(setting.memory, memory);
	const onMemoryChange = useDebounceFn((e: React.FormEvent<HTMLDivElement>) => {
		const ele = e.target as HTMLElement;
		if (ele.innerText !== ''){
			const memory = Math.min(
				Number(ele.innerText),
				setting.max_memory ?? Number.MAX_SAFE_INTEGER
			);
			setMemory(memory);
			onChange(memory);
			document.execCommand('selectAll', false, '');
			document.getSelection()?.collapseToEnd();
		}
	}, {wait: 100});
	useEffect(()=>{
		setProgress(
			parseInt(
				((memory ?? 0) / (setting.max_memory ?? 1) * 100).toString()
			)
		);
	}, [memory, setting.max_memory]);
	return (
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
						{memory}
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
					<span className='text-xs mt-[3px]'>分配 <span className='font-semibold'>{memory} / {setting.max_memory}</span> MB</span>
				</div>
			</div>
		</div>
	);
}