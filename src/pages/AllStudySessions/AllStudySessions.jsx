import { useEffect, useState } from "react";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import StudySession from "../Home/StudySessions/StudySession";

const AllStudySessions = () => {
  const axoisPublic = useAxoisSecure();
  const [count, setCount] = useState(null);
  const sessionPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const numberOfPages = Math.ceil(count / sessionPerPage);

  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    axoisPublic.get("sessionCount").then((res) => {
      setCount(res.data.count);
    });
  }, [axoisPublic]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const { data: allStudySessions = [], isPending } = useQuery({
    queryKey: [currentPage, "allStudySessions"],
    queryFn: async () => {
      const res = await axoisPublic.get(
        `/allStudySessions?page=${currentPage}&size=${sessionPerPage}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return (
      <p className='flex justify-center h-[50vh] pt-52'>
        <HashLoader size={50} color='#2ECA7F' />
      </p>
    );
  }

  return (
    <div className='dark:bg-color3'>
      <div className='mt-16 max-w-screen-xl mx-auto px-2 md:px-4 lg:px-0'>
        <div className='py-20'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {allStudySessions.map((studySession) => (
              <StudySession
                key={studySession._id}
                studySession={studySession}></StudySession>
            ))}
          </div>
          <div className='mt-10 flex gap-4 justify-center items-center'>
            <button
              onClick={handlePrevPage}
              className='text-color6 dark:text-color7 p-[10px] text-xl'>
              <FaChevronLeft />
            </button>
            {pages.map((page) => (
              <button
                onClick={() => setCurrentPage(page)}
                className={`${
                  currentPage === page
                    ? "bg-color2 border-2 text-color4 border-color2"
                    : "border-2 border-color5 dark:border-color7 dark:text-color7 text-color5"
                } w-10 h-10 rounded-full`}
                key={page}>
                {page + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              className='text-color6 p-[10px] text-xl'>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudySessions;
