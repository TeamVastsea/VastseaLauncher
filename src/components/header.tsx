import React from 'react';
export function Header({className, uuid}: {className:string, uuid: string}){
	return (
		<div
			className={className}
		>
			<div className='w-fit h-full mr-0 ml-auto flex'>
				<div className='w-14 h-full'>
					<img src={`https://crafatar.com/avatars/${uuid}?size=56`} alt="" />
				</div>
				<div className='mx-2 w-fit h-full text-gray-900'>
					<div className='truncate'>
						<span>GaoNeng-wWw</span>
					</div>
					<span className='w-fit'>已登录</span>
				</div>
			</div>
		</div>
	);
}