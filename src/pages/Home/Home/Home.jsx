import Banner from "../Banner/Banner";
import StudySessions from "../StudySessions/StudySessions";
import Teachers from "../Teachers/Teachers";

const Home = () => {
  return (
    <div className='space-y-24'>
      <Banner />
      <StudySessions />
      <Teachers />
    </div>
  );
};

export default Home;
