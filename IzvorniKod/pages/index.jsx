import Layout from "../components/layout";
import { useAuth } from "../lib/context";
import styles from "../styles/Index.module.scss";
import Header from "../components/Header";
import { styled } from "@mui/material/styles";
import { FormControl, InputBase, MenuItem, Modal, Select } from "@mui/material";
import { useState } from "react";
import {
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
import { borderBottom } from "@mui/system";

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
		borderRadius: 0,
		position: "relative",
		background: "none",
		border: "none",
		borderBottom: "2px solid #d9d9d9",
		fontSize: "1.2rem",
		padding: "8px 16px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		fontFamily: "Source Sans Pro",
		transition: "all 0.2s ease-in-out",
		color: "#7842ACF5",
		"&:focus": {
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
			if (key === "geopoint") {
				newItem[key] = {
					latitude: value.latitude,
					longitude: value.longitude,
				};
			} else {
				newItem[key] = value;
			}
		});
		return newItem;
	});
	console.log(initCompanies);

	const locationsRef = collection(db, "locations");
	const locationsSnapshot = await getDocs(locationsRef);
	const initLocations = locationsSnapshot.docs.map((doc) => {
		const newItem = {};
		newItem.id = doc.id;
		Object.entries(doc.data()).forEach(([key, value]) => {
			if (key === "geopoint") {
				newItem[key] = {
					latitude: value.latitude,
					longitude: value.longitude,
				};
			} else {
				newItem[key] = value;
			}
		});
		return newItem;
	});
	console.log(initLocations);

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
			geopoint: geoPoint,
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
			<button className={styles.gumb} onClick={() => setOpen(true)}>
				Add location
			</button>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div className="modal">
					<div>
						<form onSubmit={handleSubmit} style={{ width: "100%" }}>
							<div>
								<span className={styles.inputs}>name</span>
								<br />
								<input
									className={styles.text}
									type="text"
									value={inputName}
									onChange={(e) =>
										setInputName(e.target.value)
									}
									disabled={
										name === "Unknown location"
											? false
											: true
									}
								/>
							</div>
							<div>
								<span className={styles.inputs}>address</span>
								<br />
								<input
									className={styles.text}
									type="text"
									value={address}
									disabled
								/>
							</div>
							<div className="input-container">
								<span className={styles.inputs}>category</span>
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
											<em></em>
										</MenuItem>
										{categories.map((type) => (
											<MenuItem key={type} value={type}>
												{type}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
							<div className={styles.ratingSearch}>
								{/* <span className={styles.inputs}>rating</span> */}
								<div>
									<input
										type="checkbox"
										id="upvote"
										style={{ display: "none" }}
										onChange={() => {
											setUpvote(true);
											setDownvote(false);
										}}
										checked={upvote}
									/>
									<label
										for="upvote"
										style={{
											fontSize: upvote
												? "1.8rem"
												: "1.1rem",
										}}
									>
										👍
									</label>
									<input
										type="checkbox"
										id="downvote"
										style={{ display: "none" }}
										onChange={() => {
											setDownvote(true);
											setUpvote(false);
										}}
										checked={downvote}
									/>
									<label
										for="downvote"
										style={{
											fontSize: downvote
												? "1.8rem"
												: "1.1rem",
										}}
									>
										👎
									</label>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<button
									type="submit"
									className={styles.gumb}
									style={{ width: "40%" }}
								>
									Add
								</button>
								<button
									className={styles.gumb}
									onClick={() => setOpen(false)}
									style={{ width: "40%" }}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
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
		height: "100vh",
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
					company.geopoint.latitude ===
					autocomplete.getPlaces()[0].geometry.location.lat() &&
					company.geopoint.longitude ===
					autocomplete.getPlaces()[0].geometry.location.lng()
			);
			let locationFound = undefined;
			locationFound = locations.find(
				(location) =>
					location.geopoint.latitude ===
					autocomplete.getPlaces()[0].geometry.location.lat() &&
					location.geopoint.longitude ===
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
				company.geopoint.lat === lat && company.geopoint.lng === lng
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
							<h2 className={styles.title}>
								{
									companies.find(
										(company) =>
											company.id === modalData.companyId
									).name
								}
							</h2>
							<div>
								<span className={styles.inputs}>address</span>
								<p className={styles.text}>
									{
										companies.find(
											(company) =>
												company.id === modalData.companyId
										).address
									}
								</p>
							</div>

							<div>
								<span className={styles.inputs}>category</span>
								<p className={styles.text}>
									{
										companies.find(
											(company) =>
												company.id === modalData.companyId
										).type
									}
								</p>
							</div>

							<div>
								<span className={styles.inputs}>contact number</span>
								<p className={styles.text}>
									{
										companies.find(
											(company) =>
												company.id === modalData.companyId
										).phone
									}
								</p>
							</div>

							<div>
								<span className={styles.inputs}>description</span>
								<p className={styles.text}>
									{
										companies.find(
											(company) =>
												company.id === modalData.companyId
										).description
									}
								</p>
							</div>
							{/* <p>
								{
									companies.find(
										(company) =>
											company.id === modalData.companyId
									)?.upvotes?.length
								}
							</p> */}
							{/* <p>
								{
									companies.find(
										(company) =>
											company.id === modalData.companyId
									)?.downvotes?.length
								}
							</p> */}
							{authUser && !user.companyOwner && (
								<div className={styles.divGumbi}>
									<button
										className={styles.gumbLikes}
										onClick={() =>
											upvote({
												company: true,
												id: modalData.companyId,
											})
										}
									>
										<span
											style={{
												fontSize: companies
													.find(
														(company) =>
															company.id ===
															modalData.companyId
													)
													?.upvotes?.includes(
														authUser.uid
													)
													? "1.8rem"
													: "1.2rem",
											}}>
											👍
										</span>
										<span>
											(
											{
												companies.find(
													(company) =>
														company.id ===
														modalData.companyId
												)?.upvotes?.length
											}
											)
										</span>
									</button>
									<button
										className={styles.gumbLikes}
										onClick={() =>
											downvote({
												company: true,
												id: modalData.companyId,
											})
										}
									>
										<span
											style={{
												fontSize: companies
													.find(
														(company) =>
															company.id ===
															modalData.companyId
													)
													?.downvotes?.includes(
														authUser.uid
													)
													? "1.8rem"
													: "1.2rem",
											}}
										>
											👎
										</span>
										<span>
											(
											{
												companies.find(
													(company) =>
														company.id ===
														modalData.companyId
												)?.downvotes?.length
											}
											)
										</span>
									</button>
								</div>
								// <div>
								// 	{companies
								// 		.find(
								// 			(company) =>
								// 				company.id ===
								// 				modalData.companyId
								// 		)
								// 		?.upvotes?.includes(authUser.uid) && (
								// 			<p>Upvoted</p>
								// 		)}
								// 	{companies
								// 		.find(
								// 			(company) =>
								// 				company.id ===
								// 				modalData.companyId
								// 		)
								// 		?.downvotes?.includes(authUser.uid) && (
								// 			<p>Downvoted</p>
								// 		)}
								// </div>
							)}
						</>
					)}
					{modalData?.location && (
						<>
							<h2 className={styles.title}>
								{
									locations.find(
										(location) =>
											location.id === modalData.locationId
									)?.name
								}
							</h2>
							<div>
								<span className={styles.inputs}>address</span>
								<p className={styles.text}>
									{
										locations.find(
											(location) =>
												location.id ===
												modalData.locationId
										)?.address
									}
								</p>
							</div>

							{/* prikaz kategorije ako je ima */}
							{locations.find(
								(location) =>
									location.id === modalData.locationId
							)?.category && (
									<div>
										<span className={styles.inputs}>
											category
										</span>
										<p className={styles.text}>
											{
												locations.find(
													(location) =>
														location.id ===
														modalData.locationId
												)?.category
											}
										</p>
									</div>
								)}

							{authUser && !user.companyOwner && (
								<>
									<div className={styles.divGumbi}>
										<button
											className={styles.gumbLikes}
											onClick={() =>
												upvote({
													company: false,
													id: modalData.locationId,
												})
											}
										>
											<span
												style={{
													fontSize: locations
														.find(
															(location) =>
																location.id ===
																modalData.locationId
														)
														?.upvotes?.includes(
															authUser.uid
														)
														? "1.8rem"
														: "1.2rem",
												}}
											>
												👍
											</span>
											<span>
												(
												{
													locations.find(
														(location) =>
															location.id ===
															modalData.locationId
													)?.upvotes?.length
												}
												)
											</span>
										</button>
										<button
											className={styles.gumbLikes}
											onClick={() =>
												downvote({
													company: false,
													id: modalData.locationId,
												})
											}
										>
											<span
												style={{
													fontSize: locations
														.find(
															(location) =>
																location.id ===
																modalData.locationId
														)
														?.downvotes?.includes(
															authUser.uid
														)
														? "1.8rem"
														: "1.2rem",
												}}
											>
												👎
											</span>
											<span>
												(
												{
													locations.find(
														(location) =>
															location.id ===
															modalData.locationId
													)?.downvotes?.length
												}
												)
											</span>
										</button>
									</div>

									<div>
										{authUser.uid ===
											locations.find(
												(location) =>
													location.id ===
													modalData.locationId
											).user && (
												<button
													className={styles.gumb}
													onClick={() =>
														deleteLocation(
															modalData.locationId
														)
													}
												>
													Delete
												</button>
											)}
									</div>
								</>
							)}
						</>
					)}
					{modalData?.search && (
						<>
							<h2 className={styles.title}>{modalData.name}</h2>
							<div>
								<span className={styles.inputs}>address</span>
								<p className={styles.text}>
									{modalData.address}
								</p>
							</div>
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
									<MenuItem value="all">All</MenuItem>
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
							{companies.map((company) => ((companyType === "" || companyType === "all") || companyType === company.type) && (
								<MarkerF
									key={company.id}
									position={{
										lat: company.geopoint.latitude,
										lng: company.geopoint.longitude,
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
							{locations.map((location) => ((companyType === "" || companyType === "all") || companyType === location.category) && (
								<MarkerF
									key={location.id}
									position={{
										lat: location.geopoint.latitude,
										lng: location.geopoint.longitude,
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
