import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore, atom, Provider } from 'jotai';

import './assets/css/main.css';

import App from './App';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/nav-bar';
import { invoke } from '@tauri-apps/api';

const store = createStore();
export const settingAtom = atom<Partial<Setting>>({});
export const tokenAtom = atom<AuthCredentials>({
	access_token: '',
	refresh_token: '',
	vastsea_token: ''
});
export const authAtom = atom<boolean>(false);
export const profileAtom = atom({
	mojang:{
		user_name: 'Snowball_233',
		uuid: 'fc54dd5b70914e3d88663181ee517d5b'
	},
	vastsea: {
		_id: '',
		ban_reason: '',
		bind_qq: -1,
		display_name: '',
		enabled: false,
		group: []
	}
} as Profile);

store.set(settingAtom, {});
store.set(tokenAtom, {
	access_token: '',
	refresh_token: '',
	vastsea_token: ''
});
store.set(authAtom, false);

store.sub(settingAtom, () => {
	invoke('update_setting', {setting: store.get(settingAtom)});
});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<div className='w-[800px] h-[600px] flex flex-col bg-[url("public/img/bg.png")] bg-cover rounded-[12px]'>
					<NavBar />
					<App />
					<Toaster containerClassName='w-[800px] h-[calc(600px_-_30px)] mx-auto mt-[30px] top-0' containerStyle={{
						inset: '0'
					}} />
				</div>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
