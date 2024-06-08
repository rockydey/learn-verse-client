import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxoisPublic from "../../../hooks/useAxoisPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";

const Teachers = () => {
  const axoisPublic = useAxoisPublic();
  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await axoisPublic.get("/teachers");
      return res.data;
    },
  });

  return (
    <div className='max-w-screen-xl mx-auto px-2 md:px-4 lg:px-0'>
      <div className='pb-24'>
        <SectionTitle
          heading='Team of Experts'
          subHeading='Here you will have the team of experts from multifarious industries you will learn from them under their experience and ethical guidance'
        />
        <div className='mt-10 '>
          <Swiper
            spaceBetween={30}
            freeMode={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[FreeMode, Autoplay, Pagination]}
            className='mySwiper'>
            {teachers.map((teacher) => (
              <SwiperSlide key={teacher._id}>
                <div className='bg-color9 dark:bg-color5 px-5 pt-5'>
                  <div className='flex justify-center'>
                    <img
                      className='rounded-full w-80'
                      src={teacher.user_image}
                      alt=''
                    />
                  </div>
                  <div className='text-center mt-5'>
                    <h3 className='text-color5 dark:text-color4 text-xl font-semibold'>
                      {teacher.user_name}
                    </h3>
                    <p className='text-lg mt-1 capitalize font-medium dark:text-color9 text-color5'>
                      {teacher.specialist} teacher
                    </p>
                  </div>
                  <div className='flex gap-3 justify-center mt-5'>
                    <p className='bg-color1 text-color9 text-lg px-3 pt-3 pb-4 cursor-pointer rounded-t-full'>
                      <FaFacebook />
                    </p>
                    <p className='bg-color1 text-color9 text-lg px-3 pt-3 pb-4 cursor-pointer rounded-t-full'>
                      <FaTwitter />
                    </p>
                    <p className='bg-color1 text-color9 text-lg px-3 pt-3 pb-4 cursor-pointer rounded-t-full'>
                      <FaInstagramSquare />
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
