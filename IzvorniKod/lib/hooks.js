export function useMyHooks() {
	const checkPasswordBlacklist = async (password) => {
        const file = await fetch("/password_blacklist.json");
        const blacklist = await file.json();
        console.log(blacklist);
		if (blacklist.includes(password)) {
            console.log("password is in blacklist");
			return true;
		}
        console.log("Password is not in blacklist");
		return false;
	};

	return { checkPasswordBlacklist };
}
