import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import { Helmet } from "react-helmet-async";

const CreateSession = () => {
  const axoisSecure = useAxoisSecure();
  const { user } = useAuth();
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [date3, setDate3] = useState("");
  const [date4, setDate4] = useState("");

  const handleCreateSession = (event) => {
    event.preventDefault();
    const form = event.target;

    const session_title = form.sessionTitle.value;
    const tutor_name = form.tutorName.value;
    const tutor_email = form.tutorEmail.value;
    const session_description = form.sessionDes.value;
    const session_duration = form.sessionDuration.value;
    const session_category = form.sessionCategory.value;
    const registration_fee = form.regFee.value;
    const status = form.status.value;

    if (date1.isAfter(moment(date2)) || date3.isAfter(moment(date4))) {
      return toast.error("End date can't be earlier than start date!");
    } else if (date1.isAfter(moment(date3))) {
      return toast.error(
        "Class start data can't be earlier than registration start date!"
      );
    } else if (date2.isAfter(moment(date3))) {
      return toast.error(
        "Class start date can't be earlier than registration end date!"
      );
    }

    const sessionInfo = {
      session_title,
      tutor_name,
      tutor_email,
      session_description,
      registration_start: date1._i,
      registration_end: date2._i,
      class_start: date3._i,
      class_end: date4._i,
      session_duration,
      session_category,
      registration_fee,
      status,
    };

    axoisSecure
      .post("/sessions", sessionInfo)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Session created successfully!");
          form.reset();
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className='px-2 md:px-4 lg:px-0'>
      <Helmet>
        <title>LearnVerse | Dashboard | Create Session</title>
      </Helmet>
      <SectionTitle heading='Create New Session' subHeading='' />
      <div className='mt-10 max-w-screen-sm mx-auto'>
        <form
          onSubmit={handleCreateSession}
          className='border-2 space-y-3 text-color5 border-color2 p-8 rounded-xl'>
          <div className='space-y-1'>
            <label
              className='text-color6 font-semibold text-base'
              htmlFor='sessionTitle'>
              Session Title :
            </label>
            <input
              id='sessionTitle'
              type='text'
              name='sessionTitle'
              required={true}
              placeholder='Session title'
              className='w-full border-0 bg-color7 rounded-md'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <label
                className='text-color6 font-semibold text-base'
                htmlFor='tutorName'>
                Tutor Name :
              </label>
              <input
                id='tutorName'
                name='tutorName'
                type='text'
                defaultValue={user?.displayName}
                readOnly
                className='w-full border-0 bg-color7 rounded-md'
              />
            </div>
            <div className='space-y-1'>
              <label
                className='text-color6 font-semibold text-base'
                htmlFor='tutorEmail'>
                Tutor Email :
              </label>
              <input
                id='tutorEmail'
                name='tutorEmail'
                type='text'
                readOnly
                defaultValue={user?.email}
                className='w-full border-0 bg-color7 rounded-md'
              />
            </div>
          </div>
          <div className='space-y-1'>
            <label
              className='text-color6 font-semibold text-base'
              htmlFor='sessionDes'>
              Session Description :
            </label>
            <textarea
              rows={3}
              id='sessionDes'
              name='sessionDes'
              type='text'
              required={true}
              placeholder='Session description'
              className='w-full border-0 bg-color7 rounded-md'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <label
                className='text-color6 font-semibold text-base'
                htmlFor='regStart'>
                Registration Start Date :
              </label>
              <input
                id='regStart'
                name='regStart'
                type='date'
                required={true}
                onChange={(e) => setDate1(moment(e.target.value))}
                className='w-full border-0 bg-color7 rounded-md'
              />
            </div>
            <div className='space-y-1'>
              <label
                className='text-color6 font-semibold text-base'
                htmlFor='regEnd'>
                Registration End Date :
              </label>
              <input
                id='regEnd'
                name='regEnd'
                type='date'
                onChange={(e) => setDate2(moment(e.target.value))}
                required={true}
                className='w-full border-0 bg-color7 rounded-md'
              />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <label
                className='text-color6 font-semibold text-base'
                htmlFor='classStart'>
                Class Start Date :
              </label>
              <input
                id='classStart'
                name='classStart'
                type='date'
                required={true}
                onChange={(e) => setDate3(moment(e.target.value))}
                className='w-full border-0 bg-color7 rounded-md'
              />
            </div>
            <div className='space-y-1'>
              <label
                className='text-color6 font-semibold text-base'
                htmlFor='classEnd'>
                Class End Date :
              </label>
              <input
                id='classEnd'
                name='classEnd'
                type='date'
                required={true}
                onChange={(e) => setDate4(moment(e.target.value))}
                className='w-full border-0 bg-color7 rounded-md'
              />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <label
                className='text-color6 font-semibold text-base'
                htmlFor='sessionDuration'>
                Session Duration :
              </label>
              <input
                id='sessionDuration'
                name='sessionDuration'
                type='number'
                required={true}
                placeholder='Session duration'
                className='w-full border-0 bg-color7 rounded-md'
              />
            </div>
            <div className='space-y-1'>
              <label
                className='text-color6 font-semibold text-base'
                htmlFor='sessionCategory'>
                Session Category :
              </label>
              <input
                id='sessionCategory'
                name='sessionCategory'
                type='text'
                required={true}
                placeholder='Session category'
                className='w-full border-0 bg-color7 rounded-md'
              />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <label
                className='text-color6 font-semibold text-base'
                htmlFor='regFee'>
                Registration Fee :
              </label>
              <input
                id='regFee'
                name='regFee'
                type='number'
                defaultValue={0}
                readOnly
                className='w-full border-0 bg-color7 rounded-md'
              />
            </div>
            <div className='space-y-1'>
              <label
                className='text-color6 font-semibold text-base'
                htmlFor='status'>
                Status :
              </label>
              <input
                id='status'
                name='status'
                type='text'
                readOnly
                defaultValue='pending'
                className='w-full border-0 bg-color7 rounded-md'
              />
            </div>
          </div>
          <div className='text-center pt-3'>
            <input
              className='bg-color1 cursor-pointer uppercase text-lg rounded-md font-medium text-color4 px-4 py-3'
              type='submit'
              value='Create Session'
            />
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateSession;
