import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import styles from "../styles/Index.module.scss";
import Header from "../components/Header";
import { styled } from "@mui/material/styles";
import { FormControl, InputBase, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";

// home page
export default function Home() {
	const { authUser, loading, firebaseSignOut } = useAuth();
	const companyTypes = [
		"park",
		"beach",
		"store",
		"caffe",
		"restaurant",
		"veterinary clicnic",
		"beauty salon",
	];
	const [companyType, setCompanyType] = useState("");

	const BootstrapInput = styled(InputBase)(({ theme }) => ({
		"label + &": {
			marginTop: theme.spacing(3),
		},
		"& .MuiInputBase-input": {
			borderRadius: 32,
			position: "relative",
			background: "none",
			border: "2px solid #d9d9d9",
			fontSize: "1.2rem",
			padding: "8px 16px",
			transition: theme.transitions.create([
				"border-color",
				"box-shadow",
			]),
			fontFamily: "Source Sans Pro",
			transition: "all 0.2s ease-in-out",
			color: "white",
			"&:focus": {
				borderRadius: 32,
				border: "2px solid white",
				transition: "all 0.2s ease-in-out",
			},
		},
	}));

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "AIzaSyDM6Dg-tuF7e6WrT88NoKbKo2BCIUvsa1Y",
	});

	const containerStyle = {
		width: "100%",
		height: "100%",
	};

	const [center, setCenter] = useState({
		lat: 45.815,
		lng: 15.9819,
	});

	const onLoad = (marker) => {
		console.log("marker: ", marker);
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			console.log("Latitude is :", position.coords.latitude);
			console.log("Longitude is :", position.coords.longitude);
			setCenter({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}, []);

	return (
		<Layout>
			<Header />
			<section className={styles.main}>
				<div className={styles.left}>
					<form action="">
						<input type="text" placeholder="Search" />
						<div className="input-container">
							<FormControl>
								<Select
									displayEmpty
									value={companyType}
									onChange={(event) => {
										setCompanyType(event.target.value);
									}}
									input={<BootstrapInput />}
									inputProps={{
										"aria-label": "Without label",
									}}
								>
									<MenuItem disabled value="">
										<em>Category</em>
									</MenuItem>
									{companyTypes.map((type) => (
										<MenuItem key={type} value={type}>
											{type}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
					</form>
				</div>
				<div className={styles.right}>
					{isLoaded && (
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={center}
							zoom={13}
						>
							{/* Child components, such as markers, info windows, etc. */}
							<MarkerF
								onLoad={onLoad}
								position={{
									lat: center.lat,
									lng: center.lng,
								}}
							/>
						</GoogleMap>
					)}
				</div>
			</section>
		</Layout>
	);
}
