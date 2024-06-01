const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className='text-center'>
      <div className='flex items-center justify-center'>
        <div className='border-[3px] w-4 h-4 border-color1 rounded-full'></div>
        <div className='border-b-[3px] border-color1 w-16'></div>
        <h2 className='font-merriweather text-3xl px-3 font-bold text-color1'>
          {heading}
        </h2>
        <div className='border-b-[3px] border-color1 w-16'></div>
        <div className='border-[3px] w-4 h-4 border-color1 rounded-full'></div>
      </div>
      <h4>{subHeading}</h4>
    </div>
  );
};

export default SectionTitle;
