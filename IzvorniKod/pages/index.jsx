import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import styles from "../styles/Index.module.scss";
import Header from "../components/Header";
import { styled } from "@mui/material/styles";
import { FormControl, InputBase, MenuItem, Modal, Select } from "@mui/material";
import { useState } from "react";
import {
	Autocomplete,
	GoogleMap,
	MarkerF,
	StandaloneSearchBox,
	useLoadScript,
} from "@react-google-maps/api";
import { useEffect } from "react";
import {
	GeoPoint,
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	increment,
	onSnapshot,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const libraries = ["places"];

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
		transition: theme.transitions.create(["border-color", "box-shadow"]),
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

const BootstrapInputModal = styled(InputBase)(({ theme }) => ({
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
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		fontFamily: "Source Sans Pro",
		transition: "all 0.2s ease-in-out",
		color: "black",
		"&:focus": {
			borderRadius: 32,
			border: "2px solid black",
			transition: "all 0.2s ease-in-out",
		},
	},
}));

export async function getServerSideProps(context) {
	const companiesRef = collection(db, "companies");
	const companiesSnapshot = await getDocs(companiesRef);
	const initCompanies = companiesSnapshot.docs.map((doc) => {
		const newItem = {};
		newItem.id = doc.id;
		Object.entries(doc.data()).forEach(([key, value]) => {
			if (key === "location") {
				newItem[key] = {
					lat: value.latitude,
					lng: value.longitude,
				};
			} else {
				newItem[key] = value;
			}
		});
		return newItem;
	});

	const locationsRef = collection(db, "locations");
	const locationsSnapshot = await getDocs(locationsRef);
	const initLocations = locationsSnapshot.docs.map((doc) => {
		const newItem = {};
		newItem.id = doc.id;
		Object.entries(doc.data()).forEach(([key, value]) => {
			if (key === "location") {
				newItem[key] = {
					lat: value.latitude,
					lng: value.longitude,
				};
			} else {
				newItem[key] = value;
			}
		});
		return newItem;
	});
	console.log(initLocations)

	return {
		props: {
			initCompanies,
			initLocations,
		},
	};
}

const ChildModal = ({
	name,
	address,
	categories,
	lat,
	lng,
	setMySearch,
	setParentOpen,
	uid,
}) => {
	const [inputName, setInputName] = useState(name);
	const [open, setOpen] = useState(false);
	const [companyType, setCompanyType] = useState("");
	const [upvote, setUpvote] = useState(false);
	const [downvote, setDownvote] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// create firestore geolocation object
		const geoPoint = new GeoPoint(lat, lng);
		await addDoc(collection(db, "locations"), {
			name: inputName,
			address,
			location: geoPoint,
			category: companyType,
			upvotes: upvote ? [uid] : [],
			downvotes: downvote ? [uid] : [],
			user: uid,
		});
		setOpen(false);
		setMySearch(null);
		setParentOpen(false);
	};

	return (
		<>
			<button onClick={() => setOpen(true)}>Add location</button>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div className="modal">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							value={inputName}
							onChange={(e) => setInputName(e.target.value)}
							disabled={
								name === "Unknown location" ? false : true
							}
						/>
						<input type="text" value={address} disabled />
						<div className="input-container">
							<FormControl>
								<Select
									displayEmpty
									value={companyType}
									onChange={(event) => {
										setCompanyType(event.target.value);
									}}
									input={<BootstrapInputModal />}
									inputProps={{
										"aria-label": "Without label",
									}}
								>
									<MenuItem disabled value="">
										<em>Category</em>
									</MenuItem>
									{categories.map((type) => (
										<MenuItem key={type} value={type}>
											{type}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setUpvote(true);
									setDownvote(false);
								}}
								checked={upvote}
							/>
							<label>Upvote</label>
							<input
								type="checkbox"
								onChange={() => {
									setDownvote(true);
									setUpvote(false);
								}}
								checked={downvote}
							/>
							<label>Downvote</label>
						</div>
						<button type="submit">Add</button>
					</form>
					<button onClick={() => setOpen(false)}>Cancel</button>
				</div>
			</Modal>
		</>
	);
};

// home page
export default function Home({ initCompanies, initLocations }) {
	const { authUser, loading, firebaseSignOut } = useAuth();
	const [user, setUser] = useState(null);
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
	const [companies, setCompanies] = useState(initCompanies);
	const [locations, setLocations] = useState(initLocations);

	useEffect(() => {
		async function getUserInfo() {
			const userRef = doc(db, "users", authUser.uid);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				setUser(userSnap.data());
			}
		}

		if (authUser) {
			getUserInfo();
		}
	}, [authUser]);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, "companies"),
			(snapshot) => {
				const newCompanies = snapshot.docs.map((doc) => {
					const newItem = {};
					newItem.id = doc.id;
					Object.entries(doc.data()).forEach(([key, value]) => {
						if (key === "location") {
							newItem[key] = {
								lat: value.latitude,
								lng: value.longitude,
							};
						} else {
							newItem[key] = value;
						}
					});
					// console.log("newItem: ", newItem);
					return newItem;
				});
				setCompanies(newCompanies);
			}
		);
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, "locations"),
			(snapshot) => {
				const newLocations = snapshot.docs.map((doc) => {
					const newItem = {};
					newItem.id = doc.id;
					Object.entries(doc.data()).forEach(([key, value]) => {
						if (key === "location") {
							newItem[key] = {
								lat: value.latitude,
								lng: value.longitude,
							};
						} else {
							newItem[key] = value;
						}
					});
					// console.log("newItem: ", newItem);
					return newItem;
				});
				setLocations(newLocations);
			}
		);
		return () => unsubscribe();
	}, []);

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "AIzaSyDM6Dg-tuF7e6WrT88NoKbKo2BCIUvsa1Y",
		libraries: libraries,
	});

	const [markers, setMarkers] = useState([]);
	const [modalData, setModalData] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [map, setMap] = useState(null);

	if (loadError) return "Error";

	const containerStyle = {
		width: "100%",
		height: "100%",
	};

	const [center, setCenter] = useState({
		lat: 45.815,
		lng: 15.9819,
	});

	const [myLocation, setMyLocation] = useState({
		lat: 45.815,
		lng: 15.9819,
	});

	const [mySearch, setMySearch] = useState(null);

	const onLoad = (marker) => {
		// console.log("marker: ", marker);
	};

	const [autocomplete, setAutocomplete] = useState(null);
	const onPlaceChanged = () => {
		// console.log("onPlaceChanged", autocomplete);
		if (autocomplete !== null) {
			// console.log(autocomplete.getPlaces()[0]);
			// console.log(autocomplete.getPlaces()[0].geometry.location.lat());
			// console.log(autocomplete.getPlaces()[0].geometry.location.lng());
			setCenter({
				lat: autocomplete.getPlaces()[0].geometry.location.lat(),
				lng: autocomplete.getPlaces()[0].geometry.location.lng(),
			});

			let companyFound = undefined;
			companyFound = companies.find(
				(company) =>
					company.location.lat ===
						autocomplete.getPlaces()[0].geometry.location.lat() &&
					company.location.lng ===
						autocomplete.getPlaces()[0].geometry.location.lng()
			);
			let locationFound = undefined;
			locationFound = locations.find(
				(location) =>
					location.lat ===
						autocomplete.getPlaces()[0].geometry.location.lat() &&
					location.lng ===
						autocomplete.getPlaces()[0].geometry.location.lng()
			);

			if (companyFound) {
				console.log("company found");
				setMySearch(companyFound.id);
			} else if (locationFound) {
				console.log("location found");
				setMySearch(locationFound.id);
			} else {
				console.log("company not found");
				setMySearch({
					lat: autocomplete.getPlaces()[0].geometry.location.lat(),
					lng: autocomplete.getPlaces()[0].geometry.location.lng(),
					name: autocomplete.getPlaces()[0].name,
					address: autocomplete.getPlaces()[0].formatted_address,
				});
			}
		} else {
			console.log("Autocomplete is not loaded yet!");
		}
	};

	const onAutoCompleteLoad = (autoC) => {
		setAutocomplete(autoC);
		// console.log("autocomplete: ", autoC);
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			// console.log("Latitude is :", position.coords.latitude);
			// console.log("Longitude is :", position.coords.longitude);
			setMyLocation({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
			setCenter(myLocation);
		});
	}, []);

	useEffect(() => {
		setCenter(myLocation);
	}, [myLocation]);

	const upvote = (data) => {
		let ref = undefined;
		// console.log(data);
		if (data.company) {
			ref = doc(db, "companies", data.id);
		} else {
			ref = doc(db, "locations", data.id);
		}

		updateDoc(ref, {
			upvotes: arrayUnion(authUser.uid),
			downvotes: arrayRemove(authUser.uid),
		});
		// console.log("upvoted " + data.id);
	};

	const downvote = (data) => {
		let ref = undefined;
		if (data.company) {
			ref = doc(db, "companies", data.id);
		} else {
			ref = doc(db, "locations", data.id);
		}

		updateDoc(ref, {
			downvotes: arrayUnion(authUser.uid),
			upvotes: arrayRemove(authUser.uid),
		});
		// console.log("downvoted " + data.name);
	};

	const deleteLocation = (id) => {
		setModalData(null);
		setModalOpen(false);
		const locationRef = doc(db, "locations", id);
		deleteDoc(locationRef);
	};

	const onMapLoad = (map) => {
		setMap(map);
	};

	const handleMapClick = (e) => {
		e.stop();
		const lat = e.latLng.lat();
		const lng = e.latLng.lng();
		setCenter({ lat, lng });

		let companyFound = undefined;
		companyFound = companies.find(
			(company) =>
				company.location.lat === lat && company.location.lng === lng
		);
		let locationFound = undefined;
		locationFound = locations.find(
			(location) => location.lat === lat && location.lng === lng
		);

		if (companyFound) {
			console.log("company found");
			setMySearch(companyFound.id);
		} else if (locationFound) {
			console.log("location found");
			setMySearch(locationFound.id);
		} else {
			console.log("company not found");
			if (e.placeId) {
				let request = {
					placeId: e.placeId,
					fields: ["name", "formatted_address"],
				};

				let service = new google.maps.places.PlacesService(map);

				service.getDetails(request, (place, status) => {
					if (status === google.maps.places.PlacesServiceStatus.OK) {
						console.log(place);

						setMySearch(() => {
							const data = {
								lat: lat,
								lng: lng,
								name: place.name,
								address: place.formatted_address,
							};

							setModalData({
								...data,
								search: true,
							});

							return data;
						});

						setModalOpen(true);
					} else {
						console.log("error");
					}
				});
			} else {
				console.log(e);
				console.log("no place id");
				fetch(
					"https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
						lat +
						"," +
						lng +
						"&key=AIzaSyDM6Dg-tuF7e6WrT88NoKbKo2BCIUvsa1Y"
				)
					.then((response) => response.json())
					.then((data) => {
						console.log(data.results[0].formatted_address);
						setMySearch(() => {
							const newData = {
								lat: lat,
								lng: lng,
								name: "Unknown location",
								address: data.results[0].formatted_address,
							};

							setModalData({
								...newData,
								search: true,
								noId: true,
							});

							return newData;
						});

						setModalOpen(true);
					});
			}
		}
	};

	return (
		<Layout>
			<Header />
			<Modal
				open={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setModalData(null);
				}}
			>
				<div className="modal">
					{modalData?.company && (
						<>
							<h2>
								{
									companies.find(
										(company) =>
											company.id === modalData.companyId
									).name
								}
							</h2>
							<p>
								{
									companies.find(
										(company) =>
											company.id === modalData.companyId
									).address
								}
							</p>
							<p>
								{
									companies.find(
										(company) =>
											company.id === modalData.companyId
									).description
								}
							</p>
							<p>
								{
									companies.find(
										(company) =>
											company.id === modalData.companyId
									)?.upvotes?.length
								}
							</p>
							<p>
								{
									companies.find(
										(company) =>
											company.id === modalData.companyId
									)?.downvotes?.length
								}
							</p>
							{authUser && !user.companyOwner && (
								<div>
									<button
										onClick={() =>
											upvote({
												company: true,
												id: modalData.companyId,
											})
										}
									>
										Upvote
									</button>
									<button
										onClick={() =>
											downvote({
												company: true,
												id: modalData.companyId,
											})
										}
									>
										Downvote
									</button>
									{companies
										.find(
											(company) =>
												company.id ===
												modalData.companyId
										)
										?.upvotes?.includes(authUser.uid) && (
										<p>Upvoted</p>
									)}
									{companies
										.find(
											(company) =>
												company.id ===
												modalData.companyId
										)
										?.downvotes?.includes(authUser.uid) && (
										<p>Downvoted</p>
									)}
								</div>
							)}
						</>
					)}
					{modalData?.location && (
						<>
							<h2>
								{
									locations.find(
										(location) =>
											location.id === modalData.locationId
									)?.name
								}
							</h2>
							<p>
								{
									locations.find(
										(location) =>
											location.id === modalData.locationId
									)?.address
								}
							</p>
							<p>
								{
									locations.find(
										(location) =>
											location.id === modalData.locationId
									)?.description
								}
							</p>
							<p>
								{
									locations.find(
										(location) =>
											location.id === modalData.locationId
									)?.upvotes?.length
								}
							</p>
							<p>
								{
									locations.find(
										(location) =>
											location.id === modalData.locationId
									)?.downvotes?.length
								}
							</p>
							{authUser && !user.companyOwner && (
								<div>
									<button
										onClick={() =>
											upvote({
												company: false,
												id: modalData.locationId,
											})
										}
									>
										Upvote
									</button>
									<button
										onClick={() =>
											downvote({
												company: false,
												id: modalData.locationId,
											})
										}
									>
										Downvote
									</button>
									{locations && locations
										.find(
											(location) =>
												location.id ===
												modalData.locationId
										)
										?.upvotes?.includes(authUser.uid) && (
										<p>Upvoted</p>
									)}
									{locations && locations
										.find(
											(location) =>
												location.id ===
												modalData.locationId
										)
										?.downvotes?.includes(authUser.uid) && (
										<p>Downvoted</p>
									)}
									{authUser.uid === locations.find((location) => location.id === modalData.locationId).user && (
										<button onClick={() => deleteLocation(modalData.locationId)}>Delete</button>
									)}
								</div>
							)}
						</>
					)}
					{modalData?.search && (
						<>
							<h2>{modalData.name}</h2>
							<p>{modalData.address}</p>
							{authUser && !user.companyOwner && (
								<div>
									<ChildModal
										name={modalData.name}
										address={modalData.address}
										categories={companyTypes}
										lat={modalData.lat}
										lng={modalData.lng}
										setMySearch={setMySearch}
										setParentOpen={setModalOpen}
										uid={authUser.uid}
									/>
								</div>
							)}
						</>
					)}
				</div>
			</Modal>
			<section className={styles.main}>
				<div className={styles.left}>
					<form action="">
						{isLoaded && (
							<StandaloneSearchBox
								onLoad={onAutoCompleteLoad}
								onPlacesChanged={onPlaceChanged}
							>
								<input type="text" placeholder="Search" />
							</StandaloneSearchBox>
						)}
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
							zoom={15}
							onClick={handleMapClick}
							onLoad={onMapLoad}
						>
							{/* Child components, such as markers, info windows, etc. */}
							<MarkerF
								onLoad={onLoad}
								position={{
									lat: myLocation.lat,
									lng: myLocation.lng,
								}}
								icon={{
									url: "/myLocation.svg",
									fillColor: "#2196f3",
									fillOpacity: 1,
									outlineColor: "white",
								}}
								animation={google.maps.Animation.DROP}
							/>
							{mySearch && (
								<MarkerF
									position={{
										lat: mySearch.lat,
										lng: mySearch.lng,
									}}
									animation={google.maps.Animation.DROP}
									onClick={() => {
										setModalData({
											...mySearch,
											search: true,
										});
										setModalOpen(true);
									}}
								/>
							)}
							{companies.map((company) => (
								<MarkerF
									key={company.id}
									position={{
										lat: company.location.lat,
										lng: company.location.lng,
									}}
									animation={google.maps.Animation.DROP}
									onClick={() => {
										setModalData({
											company: true,
											companyId: company.id,
											companyData: company,
										});
										setModalOpen(true);
									}}
									icon={{
										url: "/company.svg",
									}}
								/>
							))}
							{locations.map((location) => (
								<MarkerF
									key={location.id}
									position={{
										lat: location.location.lat,
										lng: location.location.lng,
									}}
									animation={google.maps.Animation.DROP}
									onClick={() => {
										setModalData({
											location: true,
											locationId: location.id,
										});
										setModalOpen(true);
									}}
									icon={{
										url: "/location.svg",
									}}
								/>
							))}
						</GoogleMap>
					)}
				</div>
			</section>
		</Layout>
	);
}
