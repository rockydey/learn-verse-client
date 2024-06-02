import Swal from "sweetalert2";
import useAxoisSecure from "../../../hooks/useAxoisSecure";

const StudentNote = ({ note, refetch }) => {
  const axoisSecure = useAxoisSecure();
  const { title, _id, description } = note;

  const handleDeleteNote = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2ECA7F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axoisSecure.delete(`/student-notes/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Note has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className='p-6 shadow-lg border-2 space-y-6 border-color7 rounded-lg flex flex-col'>
      <div className='flex-none'>
        <h3 className='text-2xl text-color5 text-center font-bold'>{title}</h3>
      </div>
      <div className='flex-grow text-base font-medium text-color6'>
        <p>{description}</p>
      </div>
      <div className='flex-none flex justify-between items-center'>
        <button className='bg-color1 px-3 py-2 text-color4 font-semibold'>
          Update Note
        </button>
        <button
          onClick={() => handleDeleteNote(_id)}
          className='bg-color10 px-3 py-2 text-color4 font-semibold'>
          Delete Note
        </button>
      </div>
    </div>
  );
};

export default StudentNote;
