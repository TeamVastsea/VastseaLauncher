import React from 'react';
import { NewList } from './new-list';
import { useSafeState, useUpdateEffect } from 'ahooks';
import Markdown from 'react-markdown';

export interface NewsProps {
	limit: number
}
export function News({className}: {className?: string}){
	const [newId, setNewId] = useSafeState('');
	const [content, setContent] = useSafeState('');
	const [title, setTitle] = useSafeState('');
	const onClickNew = (id: string) => {
		setNewId(id);
	};
	useUpdateEffect(()=>{
		if (newId){
			/**
			 * TODO: set title and content
			 */
		} else {
			setTitle('');
			setContent('');
		}
	}, [newId]);
	return (
		<div className={`w-full h-full rounded-md px-2 py-3 ${className}`}>
			<div className='w-full mb-2'>
				<h1 className='text-2xl font-bold text-center'>
					{newId === '' ? '制作组通讯' : title}
				</h1>
			</div>
			<div className='w-full'>
				{newId === '' ? 
					<NewList onClick={onClickNew}/> :
					<>
						<img src="img/back.svg" className="w-6 h-6 cursor-pointer" onClick={()=>setNewId('')}/>
						<Markdown className='prose'>
							{content}
						</Markdown>	
					</>
				}
			</div>
		</div>
	);
}