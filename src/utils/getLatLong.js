import axios from "axios";

const getLatLong = async (address) => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3VyYWppdG1haXR5IiwiYSI6ImNreTBjcjVuMDAwZWkycGxnNHZrcmgwZDkifQ.NsL50O7MXQd0L7U7AZje8A&limit=1`
    const response = await axios.get(url);
    if(response.data.features.length === 0) {
      return { error: 'Please provide valid location.' };
    } else {
      return {
        longitude: response.data.features[0].center[0],
        latitude: response.data.features[0].center[1],
        location: response.data.features[0].place_name,
      };
    }
  } catch (error) {
    return { error: 'Cannot access Mapbox service!' };
  }
}

export { getLatLong }