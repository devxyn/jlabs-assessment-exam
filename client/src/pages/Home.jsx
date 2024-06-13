/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Map from '../component/Map';
import GeoData from '../component/GeoData';

const Home = () => {
  const loaderData = useLoaderData();
  const [geoData, setGeoData] = useState(loaderData);
  const [inputData, setInputData] = useState('');
  const [history, setHistory] = useState([]);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.access_token) {
      navigate('/login');
    }

    const loc = loaderData.loc.split(',');
    setLocation({ lat: parseFloat(loc[0]), lng: parseFloat(loc[1]) });
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
      const loc = response.data.loc.split(',');
      setLocation({ lat: parseFloat(loc[0]), lng: parseFloat(loc[1]) });
      setHistory((prev) => [...prev, response.data.ip]);
      setInputData(input);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetSearch = () => {
    setInputData('');
    setGeoData(loaderData);
  };

  return (
    <div className='bg-background text-white px-5 py-10 lg:flex lg:p-0 lg:h-screen'>
      <div className='flex flex-col gap-5 mb-10  lg:mb-0 lg:gap-10 lg:bg-primary lg:w-[25%] lg:p-10'>
        <div className='flex flex-row items-center justify-between mb-5'>
          <h1 className='text-3xl font-bold'>What's my IP?</h1>
          <button className='bg-secondary rounded-lg px-4 py-3' onClick={handleLogOut}>
            Logout
          </button>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <div className='relative w-full'>
            <input
              type='text'
              name='ip-address'
              id='ip-address'
              value={inputData}
              onChange={handleInputChange}
              className='block px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-secondary rounded-lg border border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer'
              placeholder=' '
            />
            <label
              htmlFor='ip-address'
              className='absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
              Enter IP address:
            </label>
          </div>

          <div className='flex justify-center gap-4'>
            <button className='bg-secondary px-4 py-2 rounded-lg' onClick={() => handleSearch(inputData)}>
              Search
            </button>
            <button className='bg-secondary px-4 py-2 rounded-lg' onClick={handleResetSearch}>
              Reset
            </button>
          </div>
        </div>

        {!!history.length && (
          <div className='mb-5'>
            <h4 className='text-xl'>Search History</h4>
            <ul className='pl-5'>
              {history.map((item, index) => (
                <li
                  className='list-disc text-lg cursor-pointer hover:underline'
                  key={index}
                  onClick={() => handleSearch(item)}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='w-full lg:w-[75%] flex flex-col items-center justify-center lg:px-10 lg:flex lg:flex-row lg:justify-center lg:items-center'>
        <GeoData geoData={geoData} />
        <Map lat={location.lat} lng={location.lng} />
        <div></div>
      </div>
    </div>
  );
};

export default Home;
