import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import StudentNote from "./StudentNote";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const ManageNotes = () => {
  const { user } = useAuth();
  const axoisSecure = useAxoisSecure();
  const { refetch, data: notes = [] } = useQuery({
    queryKey: [user?.email, "notes"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/student-notes/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className='px-2 md:px-4 lg:px-0'>
      <Helmet>
        <title>LearnVerse | Dashboard | Manage Note</title>
      </Helmet>
      <SectionTitle heading='Manage All Notes' subHeading='' />
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {notes.map((note) => (
          <StudentNote
            key={note._id}
            note={note}
            refetch={refetch}></StudentNote>
        ))}
      </div>
    </div>
  );
};

export default ManageNotes;
