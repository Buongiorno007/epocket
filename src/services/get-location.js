export default function getCurrentGeolocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lng: position.coords.longitude,
          lat: position.coords.latitude
        });
      },
      error => {
        reject(null);
      }
    );
  });
}
