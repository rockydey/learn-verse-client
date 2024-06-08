import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxoisPublic from "../../../hooks/useAxoisPublic";
import { useQuery } from "@tanstack/react-query";
import StudySession from "./StudySession";
import { Link } from "react-router-dom";

const StudySessions = () => {
  const axoisPublic = useAxoisPublic();
  const { data: studySessions = [] } = useQuery({
    queryKey: ["studySessions"],
    queryFn: async () => {
      const res = await axoisPublic.get("allSessions");
      return res.data;
    },
  });

  return (
    <div className='max-w-screen-xl mx-auto px-2 md:px-4 lg:px-0'>
      <SectionTitle
        heading='POPULAR COURSES'
        subHeading='Explore your learning path with our top courses'
      />
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {studySessions.slice(-6).map((studySession) => (
          <StudySession
            key={studySession._id}
            studySession={studySession}></StudySession>
        ))}
      </div>
      {studySessions.length > 6 && (
        <div className='mt-10 text-center'>
          <Link
            to='/study-sessions'
            className='text-color1 px-4 py-3 border-2 border-color1 rounded-full'>
            See All Sessions
          </Link>
        </div>
      )}
    </div>
  );
};

export default StudySessions;
