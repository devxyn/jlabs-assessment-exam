/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Home = () => {
  const loaderData = useLoaderData();
  const [geoData, setGeoData] = useState(loaderData);
  const [inputData, setInputData] = useState('');
  const [history, setHistory] = useState([]);
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.access_token) {
      navigate('/login');
    }
  }, []);

  const handleLogOut = () => {
    setCookies('access_token', '');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSearch = async (input) => {
    try {
      const response = await axios.get(`https://ipinfo.io/${input}/geo`);
      setGeoData(response.data);
      setHistory((prev) => [...prev, response.data.ip]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetSearch = () => {
    setInputData('');
    setGeoData(loaderData);
  };

  return (
    <div>
      <h1 className='text-5xl'>What's my IP?</h1>
      <button onClick={handleLogOut}>Logout</button>
      <div>
        <label htmlFor='ip-address'>Enter IP address:</label>
        <input type='text' name='ip-address' id='ip-address' value={inputData} onChange={handleInputChange} />
        <button onClick={() => handleSearch(inputData)}>Search</button>
        <button onClick={handleResetSearch}>Reset</button>
      </div>

      {!!history.length && (
        <div>
          <h3>History</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index} onClick={() => handleSearch(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <p>IP: {geoData?.ip}</p>
        <p>Hostname: {geoData?.hostname}</p>
        <p>City: {geoData?.city}</p>
        <p>Region: {geoData?.region}</p>
        <p>Country: {geoData?.country}</p>
        <p>Location: {geoData?.loc}</p>
        <p>Organization {geoData?.org}</p>
        <p>Postal code: {geoData?.postal}</p>
        <p>Timezone: {geoData?.timezone}</p>
      </div>
    </div>
  );
};

export default Home;
