import React from 'react';
import { List } from '../../components/common/list/list';
import { ListItem } from '../../components/common/list/list-item';
export interface NewItem {
	img: string;
	title: string;
	description: string;
	id: string;
}
export interface NewListProps{
	onClick?: (id: string) => void;
	data?: NewItem[]
}
export function NewList(props?:NewListProps){
	const newsItem = (item: NewItem) => {
		return (
			<ListItem key={item.id}>
				<div className='flex gap-2 max-h-20 h-full' onClick={()=>props?.onClick?.(item.id)}>
					<div className='shrink-0'>
						<img src={item.img} alt="" />
					</div>
					<div className='flex-grow'>
						<h2 className='text-lg'>{item.title}</h2>
						<span className='line-clamp-2'>
							{item.description}
						</span>
					</div>
				</div>
			</ListItem>
		);
	};
	const newsItems = (props?.data ?? []).map(item => newsItem(item));
	return (
		<List>
			{newsItems.length > 0 ? newsItems : (
				<div className='w-full py-2 min-h-[128px] flex justify-center items-center overflow-hidden'>
					<span>暂无数据</span>
				</div>
			)}
		</List>
	);
}