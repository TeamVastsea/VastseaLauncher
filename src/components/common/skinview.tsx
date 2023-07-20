import React, { Ref, useLayoutEffect, useRef, useState } from 'react';
import { useRequest, useSafeState, useUpdateEffect } from 'ahooks';
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
	uuid: string;
}
export default function SkinView(props: SkinViewProps){
	const {name, width, height, background} = props;
	const [imgUrl, setImgUrl] = useSafeState('');
	const [, setViewer] = useState<SkinViewer>();
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
	useUpdateEffect(()=>{
		getSkin(props.uuid);
	},[props.uuid]);
	useLayoutEffect(()=>{
		if (imgUrl){
			const skinView = new SkinViewer({
				width,
				height,
				// background: background,
				canvas: ref.current!,
				nameTag: name,
				panorama: '',
			});
			skinView.controls.enableDamping = false;
			skinView.controls.enablePan = false;
			skinView.controls.enableRotate = false;
			skinView.controls.enableZoom = false;
			skinView.loadSkin(imgUrl);
			skinView.animation = new WalkingAnimation();
			skinView.animation.speed = 0.7;
			skinView.zoom = 0.7;
			setViewer(skinView);
		}
	},[imgUrl, width, height, background]);
	return <canvas ref={ref}/>;
}