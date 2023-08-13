import React from 'react';
import {open} from '@tauri-apps/api/shell';
export function About(){
	const staffs = [
		{
			name: 'UI设计',
			children: [
				{
					name: '御坂秋生',
					href: 'https://www.niuboss123.com/'
				},
				{
					name: '哈赤',
					href: 'https://hachiiiiiiii.co/'
				}
			]
		},
		{
			name: '后端开发',
			children: [
				{
					name: 'zrll_',
					href: 'https://github.com/zrll12'
				},
				{
					name: 'lvyitian',
					href: 'https://github.com/lvyitian'
				}
			]
		},
		{
			name: '前端开发',
			children: [
				{
					name: 'GaoNeng',
					href: 'https://github.com/GaoNeng-wWw'
				}
			]
		},
		{
			name: '开发监制',
			children: [
				{
					name: 'Snowball_233',
					href: 'https://github.com/SnowballXueQiu'
				},
				{
					name: 'fastjim',
					href: 'https://github.com/fastjim'
				}
			]
		}
	];
	const lib = [
		{
			name: 'React',
			href: 'https://react.dev/'
		},
		{
			name: 'Tauri',
			href: 'https://tauri.app/'
		}
	];
	const Staff = (props: {data: {name: string;children: {name: string;href: string;}[]}}) => {
		const {data} = props;
		return (
			<div className='font-Noto_Sans text-sm leading-none text-white'>
				<p>
					{data.name}
				</p>
				{
					(
						data.children.map(({name, href}, idx) => {
							return (
								<>
									<a onClick={()=>open(href)} className='text-white underline cursor-pointer' key={name}>{name}</a>
									{idx !== data.children.length - 1 ? <span className='font-bold'>、</span> : null}
								</>
							);
						})
					)
				}
			</div>
		);
	};
	return (
		<>
			<div className='mb-6'>
				<h1 className='text-3xl leading-0 text-white font-Noto_Sans font-bold'>关于</h1>
			</div>
			<div className='w-full flex flex-col gap-6'>
				<div className='grid grid-cols-2 gap-y-3'>
					{
						staffs.map(staff => <Staff data={staff} key={staff.name}/>)
					}
				</div>
				<div className='w-full break-words'>
					<span className='text-sm leading-none text-white'>使用的开源软件</span>
					<ul>
						{
							lib.map(({name, href})=>{
								return (<a key={name} onClick={()=>open(href)} className='cursor-pointer text-white text-sm leading-5 underline'>
									<li>{name}</li>
								</a>);
							})
						}
					</ul>
				</div>
				<div className='w-full break-words text-white text-sm leading-[normal]'>
					<p className='break-words font-Noto_Sans_Thin font-normal'>
						&quot;Minecraft&quot;以及&quot;我的世界&quot;为<a onClick={()=>open('https://www.microsoft.com/')} className='Noto_Sans_Thin underline cursor-pointer'>美国微软公司</a>的商标，本应用与微软公司没有从属关系。
					</p>
					<br />
					<p className='break-words font-Noto_Sans_Thin font-normal'>
						&copy; 2021-2023 瀚海工艺-Vastsea 保留所有权利
					</p>
				</div>
			</div>
		</>
	);
}