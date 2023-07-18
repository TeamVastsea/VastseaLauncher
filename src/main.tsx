import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import './assets/main.css';

import App from './App';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<div className='w-screen h-screen flex m-0 p-0 bg-gray-300 dark:bg-slate-800'>
			<BrowserRouter>
				<App />
				<Toaster />
			</BrowserRouter>
		</div>
	</React.StrictMode>,
);
