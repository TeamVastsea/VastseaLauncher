import React, { Ref, useLayoutEffect, useRef, useState } from 'react';
import { useMount,useRequest, useSafeState } from 'ahooks';
import api from '../../api';
import {SkinViewer, WalkingAnimation} from 'skinview3d';
import { invoke } from '@tauri-apps/api';

export interface SkinViewProps {
	name: string;
	width: number;
	height: number;
	control: boolean;
	walk: boolean;
	background: string;
}
export default function SkinView(props: SkinViewProps){
	const {name, width, height, background} = props;
	const [imgUrl, setImgUrl] = useSafeState('');
	const [viewer, setViewer] = useState<SkinViewer>();
	const ref:Ref<HTMLCanvasElement> = useRef(null);
	const {runAsync:getSkin} = useRequest(api.skin.skin, {
		cacheKey: 'api.skin.skin',
		manual:true,
		onSuccess(response){
			const {textures} = api.skin.decrypt(response.properties[0].value);
			invoke('get_skin', {url: textures.SKIN?.url, name})
				.then((value) => {
					console.log(value);
				})
				.catch((err) => {
					console.log(err);
				});
			setImgUrl(textures.SKIN?.url ?? '');
		}
	});
	const {runAsync:getUUID} = useRequest(api.skin.uuid, {
		cacheKey: 'api.skin.uuid',
		manual: true,
		onSuccess({id}){
			getSkin(id);
		},
		onError(){}
	});
	useMount(()=>{
		getUUID(name);
		// setImgUrl('img/default.png');
	});
	useLayoutEffect(()=>{
		if (imgUrl){
			console.log(imgUrl);
			const skinView = new SkinViewer({
				width,
				height,
				// background: background,
				canvas: ref.current!,
				nameTag: name,
				panorama: ''
			});
			skinView.loadSkin(imgUrl);
			skinView.animation = new WalkingAnimation();
			skinView.animation.speed = 0.7;
			skinView.zoom = 0.5;
			
			setViewer(skinView);
		}
	},[imgUrl, width, height, background]);
	return <canvas ref={ref}/>;
}