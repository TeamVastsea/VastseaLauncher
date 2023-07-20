import React from 'react';
import { Header } from '../components/header';
import SkinView from '../components/common/skinview';
import api from '../api';
import { useRequest,useMount, useSafeState } from 'ahooks';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer';



export default function Home(){
	const name = 'Snowball_233';
	const [uuid, setUUID] = useSafeState('');
	const {runAsync:getUUID} = useRequest(api.skin.uuid, {
		cacheKey: 'api.skin.uuid',
		manual: true,
		onSuccess({id}){
			setUUID(id);
		},
		onError(){}
	});
	useMount(()=>{
		getUUID(name);
		// setImgUrl('img/default.png');
	});
	return (
		<div className="w-full h-full flex flex-col">
			<Header className='w-full h-14 flex-shrink-0 flex-grow-0' uuid={uuid} />
			<div className='w-full max-h-full py-4 flex flex-grow justify-center items-center'>
				<div className='max-w-sm w-full'>
					<Outlet />
				</div>
				<SkinView name={name} width={300} height={300} background='transparent' walk control uuid={uuid}/>
			</div>
			<div className='w-full h-16 flex-shrink-0'>
				<Footer />
			</div>
		</div>
	);
}