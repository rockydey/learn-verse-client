import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import StudentNote from "./StudentNote";

const ManageNotes = () => {
  const axoisSecure = useAxoisSecure();
  const { refetch, data: notes = [] } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await axoisSecure.get("/student-notes");
      return res.data;
    },
  });

  return (
    <div>
      <SectionTitle heading='Manage All Notes' subHeading='' />
      <div className='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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
