import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const CreateNote = () => {
  const { user } = useAuth();
  const axoisSecure = useAxoisSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCreateNote = (data) => {
    const email = user?.email;
    const title = data.title;
    const description = data.description;

    const noteInfo = {
      user_email: email,
      title,
      description,
    };

    axoisSecure
      .post("/student-notes", noteInfo)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Note created successfully!");
          reset();
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className='px-2 md:px-4 lg:px-0'>
      <Helmet>
        <title>LearnVerse | Dashboard | Create Note</title>
      </Helmet>
      <SectionTitle heading='Create Session Note' subHeading='' />
      <div className='mt-16'>
        <form
          onSubmit={handleSubmit(handleCreateNote)}
          className='max-w-md mx-auto border-2 p-10 rounded-xl border-color2 space-y-4'>
          <div className='space-y-1'>
            <label
              htmlFor='email'
              className='text-lg font-semibold text-color5'>
              Email :
            </label>
            <input
              id='email'
              type='email'
              className='w-full border-0 bg-color7 rounded-md text-color5'
              defaultValue={user?.email}
              readOnly
            />
          </div>
          <div className='space-y-1'>
            <label
              htmlFor='title'
              className='text-lg font-semibold text-color5'>
              Title :
            </label>
            <input
              id='title'
              type='text'
              className='w-full border-0 bg-color7 text-color5 rounded-md'
              placeholder='Title'
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className='text-color10 font-medium'>Title is required</p>
            )}
          </div>
          <div className='space-y-1'>
            <label
              htmlFor='description'
              className='text-lg font-semibold text-color5'>
              Description :
            </label>
            <textarea
              rows={5}
              id='description'
              type='text'
              className='w-full border-0 bg-color7 text-color5 rounded-md'
              placeholder='Description'
              {...register("description", { required: true })}
            />
            {errors.title && (
              <p className='text-color10 font-medium'>Title is required</p>
            )}
          </div>
          <div className='text-start'>
            <input
              type='submit'
              value='Create Note'
              className='bg-color1 rounded-md px-4 py-3 font-semibold text-base text-color4 uppercase cursor-pointer'
            />
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateNote;
