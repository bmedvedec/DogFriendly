import React from "react";
import { useState } from "react";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

export default function PlacanjeForm() {
	const [nameOnCard, setNameOnCard] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [companyOIB, setCompanyOIB] = useState("");
	const [address, setAddress] = useState("");
	const [country, setCountry] = useState("");
	const [region, setRegion] = useState("");
	const [city, setCity] = useState("");
	const [zip, setZip] = useState("");
	const [VAT, setVAT] = useState("");

	const [cardNumber, setCardNumber] = useState("");
	const [cardexpiryDate, setCardExpiryDate] = useState("");
	const [cardCvc, setCardCVC] = useState("");

	const {
		wrapperProps,
		getCardImageProps,
		getCardNumberProps,
		getExpiryDateProps,
		getCVCProps,
	} = usePaymentInputs();

	return (
		<form>
			<div>
				<input
					name="name"
					type="text"
					placeholder="Name on card"
					value={nameOnCard}
					required
					onChange={(event) => {
						setNameOnCard(event.target.value);
					}}
				/>
			</div>
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
					name="address"
					type="text"
					placeholder="Address"
					value={address}
					required
					onChange={(event) => {
						setAddress(event.target.value);
					}}
				/>
			</div>
			<div>
				<input
					name="country"
					type="text"
					placeholder="Country"
					value={country}
					required
					onChange={(event) => {
						setCountry(event.target.value);
					}}
				/>
			</div>
			<div>
				<input
					name="region"
					type="text"
					placeholder="Region/State"
					value={region}
					onChange={(event) => {
						setRegion(event.target.value);
					}}
				/>
			</div>
			<div>
				<input
					name="city"
					type="text"
					placeholder="City"
					value={city}
					required
					onChange={(event) => {
						setCity(event.target.value);
					}}
				/>
			</div>
			<div>
				<input
					name="zip"
					type="text"
					placeholder="ZIP"
					value={zip}
					required
					onChange={(event) => {
						setZip(event.target.value);
					}}
				/>
			</div>
			<div>
				<input
					name="VAT"
					type="number"
					placeholder="VAT"
					value={VAT}
					required
					onChange={(event) => {
						setVAT(event.target.value);
					}}
				/>
			</div>
			<PaymentInputsWrapper {...wrapperProps}>
				<svg {...getCardImageProps({ images })} />
				<input
					{...getCardNumberProps({
						value: cardNumber,
						onChange: (e) => setCardNumber(e.target.value),
					})}
				/>
				<input
					{...getExpiryDateProps({
						value: cardexpiryDate,
						onChange: (e) => setCardExpiryDate(e.target.value),
					})}
				/>
				<input
					{...getCVCProps({
						value: cardCvc,
						onChange: (e) => setCardCVC(e.target.value),
					})}
				/>
			</PaymentInputsWrapper>

			<input type="submit" value="Submit" />
		</form>
	);
}
