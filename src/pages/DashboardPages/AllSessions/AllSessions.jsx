import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useState } from "react";
import { Modal } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllSessions = () => {
  const axoisSecure = useAxoisSecure();
  const [openModal, setOpenModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateSession, setUpdateSession] = useState(null);
  const [type, setType] = useState("");
  const [id, setId] = useState(null);
  const { refetch, data: allSessions = [] } = useQuery({
    queryKey: ["allSessions"],
    queryFn: async () => {
      const res = await axoisSecure.get("/sessions");
      return res.data;
    },
  });

  const handleUpdatePrice = (event) => {
    event.preventDefault();
    setOpenModal(false);

    const form = event.target;
    const regAmount = form.regAmount.value;

    axoisSecure
      .patch(`/sessions/${id}`, { regAmount })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Registration fee updated!");
          refetch();
        }
      })
      .catch((error) => toast.error(error.message));
  };

  const handleRejectReason = (event) => {
    event.preventDefault();
    setRejectModal(false);
    const form = event.target;
    const rejReason = form.rejReason.value;
    const feedback = form.feedback.value;

    const feedbackInfo = {
      rejReason,
      feedback,
    };

    axoisSecure
      .patch(`/rejectSession/${id}`, feedbackInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Session rejected successfully!");
          refetch();
        }
      })
      .catch((error) => toast.error(error.message));
  };

  const handleDeleteSession = (id) => {
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
        axoisSecure
          .delete(`/sessions/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Session has been deleted.",
                icon: "success",
                showCloseButton: false,
                timer: 1500,
              });
              refetch();
            }
          })
          .catch((error) => toast.error(error.message));
      }
    });
  };

  const handleUpdateSession = (event) => {
    event.preventDefault();
    setUpdateModal(false);

    const form = event.target;

    const session_title = form.sessionTitle.value;
    const session_description = form.sessionDes.value;
    const session_duration = form.sessionDuration.value;
    const session_category = form.sessionCategory.value;
    const registration_fee = form.regFee.value;
    const status = form.status.value;
    const registration_start = form.regStart.value;
    const registration_end = form.regEnd.value;
    const class_start = form.classStart.value;
    const class_end = form.classEnd.value;

    const updateInfo = {
      session_title,
      session_description,
      session_duration,
      session_category,
      registration_fee,
      status,
      registration_start,
      registration_end,
      class_start,
      class_end,
    };

    axoisSecure.patch(`/updateSession/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Session updated successfully!");
        refetch();
      }
    });
  };

  return (
    <div className='px-2 md:px-4 lg:px-0'>
      <Helmet>
        <title>LearnVerse | Dashboard | All Sessions</title>
      </Helmet>
      <SectionTitle heading='Manage All Sessions' subHeading='' />
      <div className='mt-10'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHead className='text-center'>
              <TableHeadCell>Tutor Email</TableHeadCell>
              <TableHeadCell>Session Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Registration Start</TableHeadCell>
              <TableHeadCell>Registration End</TableHeadCell>
              <TableHeadCell>Fee</TableHeadCell>
              <TableHeadCell></TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {allSessions.map(
                (session) =>
                  session.status !== "reject" && (
                    <TableRow
                      key={session._id}
                      className='text-color5 text-base font-medium text-center'>
                      <TableCell>{session.tutor_email}</TableCell>
                      <TableCell>{session.session_title}</TableCell>
                      <TableCell>{session.session_category}</TableCell>
                      <TableCell>{session.registration_start}</TableCell>
                      <TableCell>{session.registration_end}</TableCell>
                      <TableCell>${session.registration_fee}</TableCell>
                      {session.status === "pending" ? (
                        <>
                          <TableCell>
                            <button
                              onClick={() => {
                                setId(session._id);
                                setOpenModal(!openModal);
                              }}
                              className={`bg-color1 px-2 py-1 rounded capitalize text-color4 font-semibold`}>
                              Approve
                            </button>
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() => {
                                setId(session._id);
                                setRejectModal(!rejectModal);
                              }}
                              className={`bg-color10 px-2 py-1 rounded capitalize text-color4 font-semibold`}>
                              Reject
                            </button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>
                            <button
                              onClick={() => {
                                setUpdateModal(!updateModal);
                                setId(session._id);
                                setUpdateSession(session);
                              }}
                              className={`bg-color1 p-2 rounded-full text-color4 font-semibold`}>
                              <GrUpdate />
                            </button>
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() => handleDeleteSession(session._id)}
                              className={`bg-color10 p-2 rounded-full text-color4 font-semibold`}>
                              <RiDeleteBinLine />
                            </button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
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
                Update Fee
              </h5>
              <form
                onSubmit={handleUpdatePrice}
                className='max-w-md mx-auto text-color9 rounded-xl  space-y-4'>
                <div className='space-y-1'>
                  <label htmlFor='regFee' className='text-lg font-semibold '>
                    Registration Fee:
                  </label>
                  <input
                    id='regFee'
                    type='text'
                    placeholder='Registration type'
                    onChange={(e) => setType(e.target.value.toLowerCase())}
                    className='w-full border-0 bg-color7 text-color5 rounded-md'
                  />
                </div>
                <div className='space-y-1'>
                  <label htmlFor='regAmount' className='text-lg font-semibold '>
                    Registration Amount:
                  </label>
                  <input
                    id='regAmount'
                    name='regAmount'
                    type='number'
                    defaultValue={0}
                    readOnly={type === "free"}
                    className='w-full border-0 bg-color7 text-color5 rounded-md'
                  />
                </div>
                <div className='text-center'>
                  <input
                    type='submit'
                    value='Update Fee'
                    className='bg-color1 rounded-md px-4 py-3 font-semibold text-base text-color4 uppercase cursor-pointer'
                  />
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Modal
          show={rejectModal}
          size='xl'
          onClose={() => setRejectModal(!rejectModal)}
          popup>
          <Modal.Header className='bg-color5 text-color9 border-b-0' />
          <Modal.Body className=' bg-color5  rounded-b'>
            <div className=''>
              <h5 className='text-2xl mb-5 text-center font-bold font-merriweather text-color1'>
                Rejection Feedback
              </h5>
              <form
                onSubmit={handleRejectReason}
                className='max-w-md mx-auto text-color9 rounded-xl  space-y-4'>
                <div className='space-y-1'>
                  <label htmlFor='rejReason' className='text-lg font-semibold '>
                    Rejection Reason :
                  </label>
                  <input
                    id='rejReason'
                    name='rejReason'
                    type='text'
                    placeholder='Rejection reason'
                    className='w-full border-0 bg-color7 text-color5 rounded-md'
                  />
                </div>
                <div className='space-y-1'>
                  <label htmlFor='feedback' className='text-lg font-semibold '>
                    Feedback:
                  </label>
                  <textarea
                    rows={4}
                    id='feedback'
                    type='text'
                    name='feedback'
                    placeholder='Feedback'
                    className='w-full border-0 bg-color7 text-color5 rounded-md'
                  />
                </div>
                <div className='text-center'>
                  <input
                    type='submit'
                    value='Send Feedback'
                    className='bg-color1 rounded-md px-4 py-3 font-semibold text-base text-color4 uppercase cursor-pointer'
                  />
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Modal
          show={updateModal}
          size='2xl'
          onClose={() => setUpdateModal(!updateModal)}
          popup>
          <Modal.Header className='bg-color5 text-color9 border-b-0' />
          <Modal.Body className=' bg-color5  rounded-b'>
            <div className=''>
              <h5 className='text-2xl mb-5 text-center font-bold font-merriweather text-color1'>
                Update Session
              </h5>
              <form
                onSubmit={handleUpdateSession}
                className='space-y-3 text-color5 p-8 rounded-xl'>
                <div className='space-y-1'>
                  <label
                    className='text-color9 font-semibold text-base'
                    htmlFor='sessionTitle'>
                    Session Title :
                  </label>
                  <input
                    id='sessionTitle'
                    type='text'
                    name='sessionTitle'
                    defaultValue={updateSession?.session_title}
                    className='w-full border-0 bg-color7 rounded-md'
                  />
                </div>
                <div className='space-y-1'>
                  <label
                    className='text-color9 font-semibold text-base'
                    htmlFor='sessionDes'>
                    Session Description :
                  </label>
                  <textarea
                    rows={3}
                    id='sessionDes'
                    name='sessionDes'
                    type='text'
                    defaultValue={updateSession?.session_description}
                    className='w-full border-0 bg-color7 rounded-md'
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-1'>
                    <label
                      className='text-color9 font-semibold text-base'
                      htmlFor='regStart'>
                      Registration Start Date :
                    </label>
                    <input
                      id='regStart'
                      name='regStart'
                      type='date'
                      defaultValue={updateSession?.registration_start}
                      className='w-full border-0 bg-color7 rounded-md'
                    />
                  </div>
                  <div className='space-y-1'>
                    <label
                      className='text-color9 font-semibold text-base'
                      htmlFor='regEnd'>
                      Registration End Date :
                    </label>
                    <input
                      id='regEnd'
                      name='regEnd'
                      type='date'
                      defaultValue={updateSession?.registration_end}
                      className='w-full border-0 bg-color7 rounded-md'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-1'>
                    <label
                      className='text-color9 font-semibold text-base'
                      htmlFor='classStart'>
                      Class Start Date :
                    </label>
                    <input
                      id='classStart'
                      name='classStart'
                      type='date'
                      defaultValue={updateSession?.class_start}
                      className='w-full border-0 bg-color7 rounded-md'
                    />
                  </div>
                  <div className='space-y-1'>
                    <label
                      className='text-color9 font-semibold text-base'
                      htmlFor='classEnd'>
                      Class End Date :
                    </label>
                    <input
                      id='classEnd'
                      name='classEnd'
                      type='date'
                      defaultValue={updateSession?.class_end}
                      className='w-full border-0 bg-color7 rounded-md'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-1'>
                    <label
                      className='text-color9 font-semibold text-base'
                      htmlFor='sessionDuration'>
                      Session Duration :
                    </label>
                    <input
                      id='sessionDuration'
                      name='sessionDuration'
                      type='number'
                      defaultValue={updateSession?.session_duration}
                      className='w-full border-0 bg-color7 rounded-md'
                    />
                  </div>
                  <div className='space-y-1'>
                    <label
                      className='text-color9 font-semibold text-base'
                      htmlFor='sessionCategory'>
                      Session Category :
                    </label>
                    <input
                      id='sessionCategory'
                      name='sessionCategory'
                      type='text'
                      defaultValue={updateSession?.session_category}
                      className='w-full border-0 bg-color7 rounded-md'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-1'>
                    <label
                      className='text-color9 font-semibold text-base'
                      htmlFor='regFee'>
                      Registration Fee :
                    </label>
                    <input
                      id='regFee'
                      name='regFee'
                      type='number'
                      defaultValue={updateSession?.registration_fee}
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
                      defaultValue={updateSession?.status}
                      className='w-full border-0 bg-color7 rounded-md'
                    />
                  </div>
                </div>
                <div className='text-center pt-3'>
                  <input
                    className='bg-color1 cursor-pointer uppercase text-lg rounded-md font-medium text-color4 px-4 py-3'
                    type='submit'
                    value='Update Session'
                  />
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Toaster />
    </div>
  );
};

export default AllSessions;
