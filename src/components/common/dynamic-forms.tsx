import React, { ChangeEvent, FormEvent } from 'react';
export type ItemChange = ({event}: {event: ChangeEvent}) => void;
export type RootListen = ({id, event}: {id:string, event: ChangeEvent}) => void;
export interface DynamicFormsItems {
	title: string;
	titleClassName?: string;
	item: {
		type: 'input' | 'select' | 'progess'
	};
	itemClassName?: string;
	onChange: ItemChange
}
export interface DynamicFormsProps {
	url: string;
	onChange: RootListen;
	items: {
		[x: string]: DynamicFormsItems
	};
	preventSubmit: boolean
}
export default function DynamicForms(props: DynamicFormsProps){
	const onSubmit = (e:FormEvent | undefined) => {
		if (e){
			if (props.preventSubmit){
				e.preventDefault();
			}
		}
	};
	const onChange = (id: string, event: ChangeEvent) => {
		props.items[id].onChange({event});
	};
	const input = (id: string, fn: ItemChange) => {
		return (
			<input onChange={() => onChange(id, fn)}/>
		);
	};
	return (
		<form onSubmit={onSubmit}>
			
		</form>
	);
}