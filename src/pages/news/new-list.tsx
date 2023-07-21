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
				<div className='flex gap-2 h-full' onClick={()=>props?.onClick?.(item.id)}>
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
	const fakeData = new Array(3).fill(0).map((v, i) => {
		return {
			id: i.toString(),
			title: 'Title - ' + i,
			img: 'https://via.placeholder.com/80x80',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, facilis? Alias debitis repellendus rem ipsam autem molestias quisquam similique est nostrum? Iusto ipsam, necessitatibus magni temporibus adipisci laboriosam architecto enim.'
		};
	});
	const newsItems = (props?.data ?? fakeData).map(item => newsItem(item));
	return (
		<List>
			{newsItems.length > 0 ? newsItems : (
				<div className='bg-red-500 w-full py-2 min-h-max flex justify-center items-center overflow-hidden'>
					<span>暂无数据</span>
				</div>
			)}
		</List>
	);
}