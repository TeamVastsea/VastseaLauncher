import React from 'react';
import toast from 'react-hot-toast';
import {CSSTransition} from 'react-transition-group';
import '../assets/transition.css';

export type ToastProps = {
	message: string;
}
export function Toast(props: ToastProps){
	const {message} = props;
	return (
		toast.custom((t)=>{
			return (
				<CSSTransition classNames='fade' appear={true} in={t.visible} timeout={1000}>
					<div className={
						`
					w-fit rounded-lg text-center py-3 px-8 transition-opacity duration-1000
					dark:bg-slate-700 dark:text-white`
					}>
						{message}
					</div>
				</CSSTransition>
			);
		})
	);
}