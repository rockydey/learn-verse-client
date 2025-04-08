import { Modal } from "flowbite-react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxoisPublic from "../../../hooks/useAxoisPublic";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UploadMaterial = ({ session }) => {
  const axoisPublic = useAxoisPublic();
  const axoisSecure = useAxoisSecure();
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const { _id, session_title, session_description } = session;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleUpdateMaterials = async (data) => {
    setOpenModal(false);

    const imageFile = { image: data.image[0] };
    const res = await axoisPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      reset();
      const title = data.title;
      const sessionId = data.sessionId;
      const tutorEmail = data.tutorEmail;
      const driveLink = data.link;
      const image = res.data.data.display_url;

      const materialInfo = {
        session_title: title,
        study_session_id: sessionId,
        tutor_email: tutorEmail,
        link: driveLink,
        image,
      };

      axoisSecure.post("/materials", materialInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${title} materials uploaded.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <div className='border-2 flex flex-col p-5 rounded-lg shadow-lg border-color8 space-y-4'>
      <h2 className='text-xl flex-nome font-semibold font-merriweather text-color5'>
        {session_title}
      </h2>
      <p className='text-base flex-grow font-medium text-color6'>
        {session_description}
      </p>
      <div className='flex-nome'>
        <button
          onClick={() => setOpenModal(!openModal)}
          className='bg-color1 px-4 py-3 rounded-md text-color4 font-semibold'>
          Upload Materials
        </button>
      </div>
      <Modal
        show={openModal}
        size='xl'
        onClose={() => setOpenModal(!openModal)}
        popup>
        <Modal.Header className='bg-color5 text-color9 border-b-0' />
        <Modal.Body className=' bg-color5 rounded-b'>
          <div className=''>
            <h5 className='text-2xl mb-5 text-center font-bold font-merriweather text-color1'>
              Upload Materials
            </h5>
            <form
              onSubmit={handleSubmit(handleUpdateMaterials)}
              className='max-w-md mx-auto text-color9 rounded-xl  space-y-4'>
              <div className='space-y-1'>
                <label htmlFor='title' className='text-lg font-semibold '>
                  Session Title :
                </label>
                <input
                  id='title'
                  name='title'
                  type='text'
                  required
                  defaultValue={session_title}
                  className='w-full border-0 bg-color7 text-color5 rounded-md'
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <p className='text-color10 font-medium'>Title is required</p>
                )}
              </div>
              <div className='space-y-1'>
                <label htmlFor='sessionId' className='text-lg font-semibold '>
                  Study Session Id :
                </label>
                <input
                  id='sessionId'
                  name='sessionId'
                  type='text'
                  defaultValue={_id}
                  readOnly
                  className='w-full border-0 bg-color7 text-color5 rounded-md'
                  {...register("sessionId")}
                />
              </div>
              <div className='space-y-1'>
                <label htmlFor='tutorEmail' className='text-lg font-semibold '>
                  Tutor Email :
                </label>
                <input
                  id='tutorEmail'
                  name='tutorEmail'
                  type='text'
                  defaultValue={user?.email}
                  readOnly
                  className='w-full border-0 bg-color7 text-color5 rounded-md'
                  {...register("tutorEmail")}
                />
              </div>
              <div className='space-y-1'>
                <label htmlFor='link' className='text-lg font-semibold '>
                  Drive Link :
                </label>
                <input
                  id='link'
                  name='link'
                  type='text'
                  required
                  placeholder='Drive link'
                  className='w-full border-0 bg-color7 text-color5 rounded-md'
                  {...register("link", { required: true })}
                />
                {errors.link && (
                  <p className='text-color10 font-medium'>
                    Drive link is required
                  </p>
                )}
              </div>
              <div className='space-y-1'>
                <input
                  name='image'
                  required
                  type='file'
                  {...register("image")}
                />
              </div>
              <div className='text-center'>
                <input
                  type='submit'
                  value='Upload'
                  className='bg-color1 rounded-md px-4 py-3 font-semibold text-base text-color4 uppercase cursor-pointer'
                />
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UploadMaterial;
