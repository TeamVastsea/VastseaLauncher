import {invoke} from '@tauri-apps/api';

export function error(message: string) {
	invoke('log_error', {message: message});
}

export function info(message: string) {
	invoke('log_info', {message: message});
}

export function debug(message: string) {
	invoke('log_debug', {message: message});
}