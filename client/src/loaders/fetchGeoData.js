import axios from 'axios';

const fetchGeoData = async () => {
  try {
    const response = await axios.get('https://ipinfo.io/geo');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchGeoData;
