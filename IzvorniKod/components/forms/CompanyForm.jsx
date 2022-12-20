import React from "react";
import { useState } from "react";

export default function PersonalForm({props}) {
    
	const [companyName, setCompanyName] = useState("");
	const [companyAddress, setCompanyAddress] = useState("");
	const [companyOIB, setCompanyOIB] = useState("");
	const [companyPhone, setCompanyPhone] = useState("");
	const [companyDesc, setCompanyDesc] = useState("");
	const [companyType, setCompanyType] = useState("");

    React.useEffect(() => {
        setCompanyName(props.name);
        setCompanyAddress(props.address);
        setCompanyOIB(props.oib);
        setCompanyPhone(props.phone);
        setCompanyDesc(props.description);
        setCompanyType(props.type);
    }, []);

    return (
        <form>
            <div>
                <input
                    name="companyName"
                    type="text"
                    placeholder="Company name"
                    value={companyName}
                    required
                    onChange={(event) => {
                        setCompanyName(event.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    name="companyAddress"
                    type="text"
                    placeholder="Company address"
                    value={companyAddress}
                    required
                    onChange={(event) => {
                        setCompanyAddress(event.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    name="companyOIB"
                    type="text"
                    placeholder="Company OIB"
                    value={companyOIB}
                    required
                    onChange={(event) => {
                        setCompanyOIB(event.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    name="companyPhone"
                    type="text"
                    placeholder="Company phone"
                    value={companyPhone}
                    required
                    onChange={(event) => {
                        setCompanyPhone(event.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    name="companyDesc"
                    type="text"
                    placeholder="Company description"
                    value={companyDesc}
                    required
                    onChange={(event) => {
                        setCompanyDesc(event.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    name="companyType"
                    type="text"
                    placeholder="Company type"
                    value={companyType}
                    required
                    onChange={(event) => {
                        setCompanyType(event.target.value);
                    }}
                />
            </div>
        </form>
    );
}
