import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore, atom, Provider} from 'jotai';

import './assets/css/main.css';

import App from './App';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/nav-bar';
import { invoke } from '@tauri-apps/api';

const store = createStore();
export const settingAtom = atom<Partial<Setting>>({});

store.set(settingAtom, {});

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
					<Toaster />
				</div>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
