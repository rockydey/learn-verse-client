import Swal from "sweetalert2";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import { useState } from "react";
import { Modal } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";

const StudentNote = ({ note, refetch }) => {
  const axoisSecure = useAxoisSecure();
  const { title, _id, description } = note;
  const [openModal, setOpenModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const handleUpdateNote = (event) => {
    setOpenModal(false);
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;

    const updateInfo = {
      title,
      description,
    };

    axoisSecure
      .patch(`/student-notes/${updateId}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Note updated successfully!");
        }
        refetch();
      })
      .catch((error) => toast.error(error.message));
  };

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
        <button
          onClick={() => {
            setUpdateId(_id);
            setOpenModal(!openModal);
          }}
          className='bg-color1 px-3 py-2 text-color4 font-semibold'>
          Update Note
        </button>
        <button
          onClick={() => handleDeleteNote(_id)}
          className='bg-color10 px-3 py-2 text-color4 font-semibold'>
          Delete Note
        </button>
      </div>
      <Modal
        show={openModal}
        size='xl'
        onClose={() => setOpenModal(!openModal)}
        popup>
        <Modal.Header className='bg-color5 text-color9 border-b-0' />
        <Modal.Body className=' bg-color5  rounded-b'>
          <div className=''>
            <h5 className='text-2xl mb-5 text-center font-bold font-merriweather text-color1'>
              Update Note
            </h5>
            <form
              onSubmit={handleUpdateNote}
              className='max-w-md mx-auto text-color9 rounded-xl  space-y-4'>
              <div className='space-y-1'>
                <label htmlFor='title' className='text-lg font-semibold '>
                  Title:
                </label>
                <input
                  id='title'
                  type='text'
                  className='w-full border-0 bg-color7 text-color5 rounded-md'
                  defaultValue={title}
                />
              </div>
              <div className='space-y-1'>
                <label htmlFor='description' className='text-lg font-semibold '>
                  Description:
                </label>
                <textarea
                  rows={5}
                  id='description'
                  type='text'
                  defaultValue={description}
                  className='w-full border-0 bg-color7 text-color5 rounded-md'
                />
              </div>
              <div className='text-center'>
                <input
                  type='submit'
                  value='Update Note'
                  className='bg-color1 px-4 py-3 font-semibold text-base text-color4 uppercase cursor-pointer'
                />
              </div>
            </form>
            <Toaster />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentNote;
