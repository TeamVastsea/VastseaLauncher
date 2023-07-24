use std::io::Write;

use simple_log::new;

pub fn fold_exists(path: &str, fold: &str) -> Result<bool, String>{
	let dirs = std::fs::read_dir(path);
	let res = match dirs {
		Ok(dir) => dir,
		Err(e) => { return Err(e.to_string())}
	};
	for f in res{
		let name = match f {
			Ok(name) => name.file_name(),
			Err(e) => {return Err(e.to_string())}
		};
		if (name == fold){
			return Ok(true);
		}
	}
	Ok(false)
}
pub fn file_exists(path: &str, file_name: &str) -> Result<bool, String>{
	let dirs = std::fs::read_dir(path);
	let res = match dirs {
		Ok(dir) => dir,
		Err(e) => {return Err(e.to_string())}
	};
	for file in res{
		let name = match file {
			Ok(name) => name.file_name(),
			Err(e) => {return Err(e.to_string())}
		};
		if name == file_name{
			return Ok(true);
		}
	};
	Ok(false)
}

pub fn create_fold(path: &str, fold: &str) -> Result<bool, String> {
	let mut new_path = path.to_string();
	new_path += fold;
	let state: Result<bool, String> = match std::fs::create_dir_all(new_path) {
		Ok(res) => Ok(true),
		Err(e) => { return Err(e.to_string())}
	};
	state
}

pub fn create_file(path: &str, content: &str) -> Result<(), String>{
	let mut file = match std::fs::File::create(path){
		Ok(res) => res,
		Err(e) => {return Err(e.to_string())}
	};
	match file.write(content.as_bytes()) {
		Ok(res) => res,
		Err(e) => {return Err(e.to_string())}
	};
	Ok(())
}