const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className='text-center px-2 md:px-4 lg:px-0'>
      <div className='flex items-center justify-center'>
        <div className='border-[3px] w-3 h-3 md:w-4 md:h-4 border-color1 rounded-full'></div>
        <div className='border-b-[3px] border-color1 w-10 md:w-16'></div>
        <h2 className='font-merriweather text-[22px] md:text-3xl px-3 font-bold text-color1'>
          {heading}
        </h2>
        <div className='border-b-[3px] border-color1 w-10 md:w-16'></div>
        <div className='border-[3px] w-3 h-3 md:w-4 md:h-4 border-color1 rounded-full'></div>
      </div>
      <h4 className='mt-4 lg:w-1/2 mx-auto text-lg text-color6 capitalize'>
        {subHeading}
      </h4>
    </div>
  );
};

export default SectionTitle;
