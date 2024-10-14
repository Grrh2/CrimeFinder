export async function fetchCrimes(date, rangeString) {
    const response = await fetch(`https://data.police.uk/api/crimes-street/all-crime?date=${date}&poly=${rangeString}`);
 
    if (!response.ok) {
      if(response.status ===503) {
        throw new Error('Too many results, please refine your search');
      }
      throw new Error('Unable to get crimes');
    }
    const theData = await response.json();
    return theData
}

export async function fetchLatLon(postcode) {
  const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
  const theData = await response.json();
  console.log(theData);
  if (!response.ok) {
    throw new Error('Postcode not found');
  }
  return theData
}

export function modifyDistance(coords, distance, latOrLng="lng") {
  const earthRadius = 6371;
  const dLat = distance/earthRadius;
  const latRad = coords.lat * (Math.PI / 180);
  const newLat =  coords.lat + (dLat * (180 / Math.PI));
  const newLng = coords.lng + (dLat * (180 /Math.PI)) / Math.cos(latRad);
  if (latOrLng === "lat") {
      return ((newLat).toFixed(3));
  } else {        
      return ((newLng).toFixed(3));
  }
}
export function createPoly(coords, range) {
  const latMin = modifyDistance(coords,-range,"lat");
  const latMax = modifyDistance(coords,range,"lat");
  const lngMin = modifyDistance(coords,-range,"lng");
  const lngMax = modifyDistance(coords,range,"lng");
  return(`${latMin},${lngMin}:${latMax},${lngMin}:${latMax},${lngMax}:${latMin},${lngMax}`);
}  

export function getGeoLocation() {
  return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              resolve({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              });
          },
          (error) => {
              switch (error.code) {
                  case error.PERMISSION_DENIED:
                      reject({message:"Geolocation permission denied"});
                      break;
                  case error.POSITION_UNAVAILABLE:
                      reject({message:"Location unavailable"});
                      break;
                  case error.TIMEOUT:
                      reject({message:"Request timed out"});
                      break;
                  default:
                      reject({message:"Unknown error occured"});
                      break;
              }
          }
      )
  });
}