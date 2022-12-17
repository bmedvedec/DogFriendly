import React from "react";
import { useState } from "react";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

export default function PlacanjeForm({
	updateNameOnCard,
	updateCompanyNamePay,
	updateCompanyOIBPay,
	updateAddress,
	updateCountry,
	updateRegion,
	updateCity,
	updateZipCode,
	updateVAT,
	updateCardNumber,
	updateCardExpiryDate,
	updateCardCVC,
}) {
	// const [nameOnCard, setNameOnCard] = useState("");
	// const [companyName, setCompanyName] = useState("");
	// const [companyOIB, setCompanyOIB] = useState("");
	// const [address, setAddress] = useState("");
	// const [country, setCountry] = useState("");
	// const [region, setRegion] = useState("");
	// const [city, setCity] = useState("");
	// const [zip, setZip] = useState("");
	// const [VAT, setVAT] = useState("");

	// const [cardNumber, setCardNumber] = useState("");
	// const [expiryDate, setExpiryDate] = useState("");
	// const [cvc, setCvc] = useState("");

	const {
		wrapperProps,
		getCardImageProps,
		getCardNumberProps,
		getExpiryDateProps,
		getCVCProps,
	} = usePaymentInputs();

	function handleUpdateCardNumber(event) {
		updateCardNumber(event.target.value);
	}

	return (
		<>
			<div>
				<input
					name="name"
					type="text"
					placeholder="Name on card"
					required
					onChange={(event) => {
						updateNameOnCard(event.target.value);
					}}
				/>
			</div>

			<div>
				<input
					name="companyName"
					type="text"
					placeholder="Company name"
					required
					onChange={(event) => {
						updateCompanyNamePay(event.target.value);
					}}
				/>
			</div>

			<div>
				<input
					name="companyOIB"
					type="text"
					placeholder="Company OIB"
					required
					onChange={(event) => {
						updateCompanyOIBPay(event.target.value);
					}}
				/>
			</div>

			<div>
				<input
					name="address"
					type="text"
					placeholder="Address"
					required
					onChange={(event) => {
						updateAddress(event.target.value);
					}}
				/>
			</div>

			<div>
				<input
					name="country"
					type="text"
					placeholder="Country"
					required
					onChange={(event) => {
						updateCountry(event.target.value);
					}}
				/>
			</div>

			<div>
				<input
					name="region"
					type="text"
					placeholder="Region/State"
					onChange={(event) => {
						updateRegion(event.target.value);
					}}
				/>
			</div>

			<div>
				<input
					name="city"
					type="text"
					placeholder="City"
					required
					onChange={(event) => {
						updateCity(event.target.value);
					}}
				/>
			</div>

			<div>
				<input
					name="zip"
					type="text"
					placeholder="ZIP"
					required
					onChange={(event) => {
						updateZipCode(event.target.value);
					}}
				/>
			</div>

			<div>
				<input
					name="VAT"
					type="number"
					placeholder="VAT"
					required
					onChange={(event) => {
						updateVAT(event.target.value);
					}}
				/>
			</div>

			<PaymentInputsWrapper {...wrapperProps}>
				<svg {...getCardImageProps({ images })} />
				<input
					{...getCardNumberProps({
						onChange: (e) => handleUpdateCardNumber(e),
					})}
				/>
				<input
					{...getExpiryDateProps({
						onChange: (e) => updateCardExpiryDate(e.target.value),
					})}
				/>
				<input
					{...getCVCProps({
						onChange: (e) => updateCardCVC(e.target.value),
					})}
				/>
			</PaymentInputsWrapper>
		</>
	);
}
