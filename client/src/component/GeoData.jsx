/* eslint-disable react/prop-types */
const GeoData = ({ geoData }) => {
  return (
    <div className='w-full lg:w-1/2 lg:h-[400px] flex flex-col flex-nowrap justify-center bg-secondary p-5 lg:p-10 rounded-t-lg lg:rounded-se-none lg:rounded-l-lg text-white'>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>IP:</span>
        {geoData?.ip}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>City:</span>
        {geoData?.city}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Region:</span>
        {geoData?.region}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Country:</span>
        {geoData?.country}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Location:</span>
        {geoData?.loc}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Organization:</span>
        {geoData?.org}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Postal code:</span>
        {geoData?.postal}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Timezone:</span>
        {geoData?.timezone}
      </p>
    </div>
  );
};

export default GeoData;
