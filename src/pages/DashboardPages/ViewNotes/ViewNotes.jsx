import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import { Helmet } from "react-helmet-async";

const ViewNotes = () => {
  const axoisSecure = useAxoisSecure();
  const { data: notes = [], refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await axoisSecure.get("/notes");
      return res.data;
    },
  });

  const handleReview = (id) => {
    const review = { review: "reviewed" };
    axoisSecure.patch(`/notes/${id}`, review).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  return (
    <div className='px-2 md:px-4 lg:px-0'>
      <Helmet>
        <title>LearnVerse | Dashboard | View Student Notes</title>
      </Helmet>
      <SectionTitle heading='View All Notes' subHeading='' />
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {notes.map((note) => (
          <div
            key={note._id}
            className='border-2 flex flex-col border-color7 shadow-md space-y-4 p-5 '>
            <h3 className='text-xl flex-none text-color5 font-semibold font-merriweather'>
              {note.title}
            </h3>
            <p className='text-base grow text-color6 font-medium'>
              {note.description}
            </p>
            <div className='flex-none'>
              <button
                onClick={() => handleReview(note._id)}
                className={` ${
                  note.review === "reviewed"
                    ? "border-2 border-color1 cursor-not-allowed text-color1"
                    : "bg-color11 text-color4"
                }  px-3 py-2 rounded  font-medium`}>
                {note.review === "reviewed" ? "Reviewed" : "Review"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewNotes;
