export default function getCurrentGeolocation() {
	let options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	  }
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					lng: position.coords.longitude,
					lat: position.coords.latitude,
				})
			},
			(error) => {
				reject(
					console.log(error, 'get-location ERR')
				)
			},
			// options
		)
	})
}
