import React, { useState } from 'react';
import {Expand, Microsoft, Play, Warning} from './common/svg';
import Button from './common/button';
import { Setting } from './common/svg/setting';
import { invoke } from '@tauri-apps/api';
import { appWindow } from '@tauri-apps/api/window';
import { useAtom } from 'jotai';
import { authAtom, profileAtom, tokenAtom } from '../main';
import { useInfo, useWarning } from './common/toast';
export function Account(){
	const [profile, setProfile] = useAtom(profileAtom);
	const [, setToken] = useAtom(tokenAtom);
	const [auth, setAuth] = useAtom(authAtom);
	const [name] = useState(profile.mojang.user_name);
	const [uuid] = useState(profile.mojang.uuid);
	const login = async () => {
		appWindow.once('auth_success', ({payload}: {payload: AuthCredentials})=>{
			setToken(payload);
			setAuth(true);
			invoke<MojangProfile>('get_user_profile', {access_token: payload.access_token})
				.then((mojangProfile)=>{
					setProfile({
						mojang: mojangProfile,
						vastsea: profile.vastsea
					});
					useInfo('登陆成功');
				});
		});
		appWindow.once('auth_fail', ({payload}: {payload: string})=>{
			useWarning(payload);
		});
		await invoke('auth_window_create');
	};
	const NotLogin = () => (
		<>
			<div className='text-center'>
				<Warning className='mx-auto w-16 h-16 mb-3' fill='#fff' />
				<p className='text-sm leading-1 text-white font-Source_man'>
					你还未添加过任何账号
				</p>
				<p className='text-sm leading-1 text-white font-Source_man'>
					请绑定你的 <span className='font-Instrument_sans not-italic'>Microsoft</span> 账号
				</p>
			</div>
			<div className='w-full flex justify-center'>
				<Button text='添加账号' icon={<Microsoft />} shadow='md' className='mx-auto' onClick={login}/>
			</div>
		</>
	);
	const LogOut = () => (
		<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<mask id="mask0_38_219" style={
				{
					maskType: 'alpha'
				}
			} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
				<rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
			</mask>
			<g mask="url(#mask0_38_219)">
				<path d="M5 21.5C4.45 21.5 3.97917 21.3042 3.5875 20.9125C3.19583 20.5208 3 20.05 3 19.5V5.5C3 4.95 3.19583 4.47917 3.5875 4.0875C3.97917 3.69583 4.45 3.5 5 3.5H12V5.5H5V19.5H12V21.5H5ZM16 17.5L14.625 16.05L17.175 13.5H9V11.5H17.175L14.625 8.95L16 7.5L21 12.5L16 17.5Z" fill="white"/>
			</g>
		</svg>

	);
	const AccountInfo = () => (
		<>
			<div className='flex items-center justify-center gap-3 self-stretch'>
				<img src={`https://crafatar.com/avatars/${uuid}?size=54`} alt="" className='w-[54px] h-[54px] rounded-md flex-grow-0 flex-shrink-0' />
				<div>
					<span className='mb-[6px] font-Noto_Sans text-white'>{name}</span>
					<LogOut />
				</div>
				<Expand fill='white' className='' />
			</div>
		</>
	);
	return (
		<div className='
			flex flex-col gap-6 w-[242px] rounded-xl mt-auto mb-0 p-6 min-w-[242px]
			border border-white bg-[rgba(255,255,255,0.25)] backdrop-blur-2xl shadow-[0px_2px_2px_rgba(0,0,0,.10)]
			'>
			{ auth ? <AccountInfo /> : <NotLogin />}
			<div className='mx-auto max-w-[172px] w-full flex justify-center p-3 bg-[#00A4EF] rounded-[10px]'>
				<Button text='启动游戏' icon={<Play fill='#fff' />} shadow='md' className='rounded-r-none font-sans px-0 py-0 bg-transparent text-white '/>
				<div className='w-px h-full bg-white mx-2'></div>
				<Button icon={<Setting fill='#fff' />} shadow='md' className='rounded-l-none bg-transparent px-0 py-0'/>
			</div>
		</div>
	);
}