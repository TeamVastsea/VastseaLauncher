import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/main.css';

import App from './App';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/nav-bar';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<div className='w-[800px] h-[600px] bg-[url("public/img/bg.png")] bg-cover rounded-[12px]'>
				<NavBar />
				<App />
				<Toaster />
			</div>
		</BrowserRouter>
	</React.StrictMode>,
);
