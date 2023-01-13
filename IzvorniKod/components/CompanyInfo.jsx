import { useState } from "react";

export default function CompanyInfo(){

    const [companyName, setCompanyName] = useState("");
	const [companyAddress, setCompanyAddress] = useState("");
	const [companyOIB, setCompanyOIB] = useState("");
	const [companyPhone, setCompanyPhone] = useState("");
	const [companyDesc, setCompanyDesc] = useState("");
	const [companyType, setCompanyType] = useState("");

    const companyTypes = [
		"park",
		"beach",
		"store",
		"caffe",
		"restaurant",
		"veterinary clicnic",
		"beauty salon",
	];

        
    return(
        <>
            <div className="input-container">
                <input
                    name="companyName"
                    type="text"
                    value={companyName}
                    placeholder="Company Name"
                    onChange={(event) => setCompanyName(event.target.value)}
                />
            </div>
            <div className="input-container">
                <input
                    name="companyAddress"
                    type="text"
                    value={companyAddress}
                    placeholder="Company Address"
                    onChange={(event) => setCompanyAddress(event.target.value)}
                />
            </div>
            <div className="input-container">
                <input
                    name="companyOIB"
                    type="text"
                    value={companyOIB}
                    placeholder="Company OIB"
                    onChange={(event) => setCompanyOIB(event.target.value)}
                />
            </div>
            <div className="input-container">
                <input
                    name="companyPhone"
                    type="text"
                    value={companyPhone}
                    placeholder="Company Phone"
                    onChange={(event) => setCompanyPhone(event.target.value)}
                />
            </div>
            <div className="input-container">
                <input
                    name="companyDesc"
                    type="text"
                    value={companyDesc}
                    placeholder="Company Description"
                    onChange={(event) => setCompanyDesc(event.target.value)}
                />
            </div>
            <div className="input-container">
				<select
					name="companyType"
					value={companyType}
                    placeholder="type of business"
					onChange={(event) => setCompanyType(event.target.value)}
				>
					{companyTypes.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>
        </>
    )
}

