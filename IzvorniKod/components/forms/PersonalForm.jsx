import React from "react";
import { useState } from "react";

export default function PersonalForm({props}) {
    const [username, setUsername] = useState("");    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verified, setVerified] = useState(false);

    // return a form with initial values set to the values from props
    React.useEffect(() => {
        setUsername(props.username);
        setEmail(props.email);
        setPassword(props.password);
        setVerified(props.verified);
    }, []);
    
    return (
        <form>
            <div>
                <input
                    name="Username"
                    type="text"
                    placeholder="username"
                    value={username}
                    required
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    name="Email"
                    type="email"
                    placeholder="email"
                    value={email}
                    required
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    name="Password"
                    type="password"
                    placeholder="password"
                    value={password}
                    required
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    name="Verified"
                    type="boolean"
                    value={verified}
                    onChange={(event) => {
                        setVerified(event.target.checked);
                    }}
                />
            </div>
        </form>
    );
}

