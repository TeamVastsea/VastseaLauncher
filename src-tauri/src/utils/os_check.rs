pub fn is_window()-> bool {
	cfg!(target_os = "window")
}

pub fn is_linux()-> bool {
	cfg!(target_os = "linux")
}

pub fn is_mac() -> bool{
	cfg!(target_os = "macos")
}