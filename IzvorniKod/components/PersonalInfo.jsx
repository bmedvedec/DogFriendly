import { useState } from "react";

export default function PersonalInfo(){

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");


    return(
        <>
        	<div className="input-container">
				<input
					name="username"
					type="text"
					value={username}
					placeholder="Username"
					onChange={(event) => setUsername(event.target.value)}
				/>
			</div>
			<div className="input-container">
				<input
					name="email"
					type="email"
					value={email}
					placeholder="Email"
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
			</div>
			<div className="input-container">
				<input
					name="password"
					type="password"
					value={password}
					placeholder="Password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
			</div>
        </>
    )
}