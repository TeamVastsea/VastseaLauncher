import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/main.css';

import App from './App';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<div className='w-screen min-h-screen flex m-0 p-0 bg-gray-200'>
			<BrowserRouter>
				<App />
				<Toaster />
			</BrowserRouter>
		</div>
	</React.StrictMode>,
);
