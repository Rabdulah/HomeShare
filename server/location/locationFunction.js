import axios from 'axios';

const geosearch = async (q, limit = '1') => {
  const params = new URLSearchParams({
    q,
    limit,
    format: 'json'
  });
  const ENDPOINT = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
  const geoCode = await axios
    .get(ENDPOINT)
    .then(res => {
      let { lat, lon } = res.data[0];
      lat = Number(lat);
      lon = Number(lon);
      const location = {
        lat,
        lon
      };
      return location;
    })
    .catch(err => {
      console.log(err);
    });

    //We want the action to handle the error
//   if (!geoCode) {
//     throw new Error(`No response for Address: ${q}`);
//   }

  return geoCode;
};

export default geosearch;
