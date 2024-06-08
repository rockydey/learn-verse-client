import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import StudySessions from "../StudySessions/StudySessions";
import Teachers from "../Teachers/Teachers";

const Home = () => {
  return (
    <div className='space-y-24 dark:bg-color3'>
      <Helmet>
        <title>LearnVerse | Home</title>
      </Helmet>
      <Banner />
      <StudySessions />
      <Teachers />
    </div>
  );
};

export default Home;
