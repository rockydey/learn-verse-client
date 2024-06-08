import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import { Table, TableBody, TableCell, TableRow } from "flowbite-react";
import { useState } from "react";
import { Modal } from "flowbite-react";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import useSessionData from "../../../hooks/useSessionData";

const ViewSessions = () => {
  const [sessions, refetch] = useSessionData();
  const [feedback, setFeedback] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const axoisSecure = useAxoisSecure();

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

  const handleRequestAgain = (id) => {
    const status = { status: "pending" };
    axoisSecure.patch(`/sessionStatus/${id}`, status).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Request send successfully!");
        refetch();
      }
    });
  };

  return (
    <div className='px-2 md:px-4 lg:px-0'>
      <SectionTitle heading='View All Sessions' subHeading='' />
      <div className='mt-10'>
        <div className='overflow-x-auto'>
          <Table>
            <TableBody className='divide-y'>
              {sessions.map((session, index) => (
                <TableRow
                  key={session._id}
                  className='text-color5 text-base font-medium'>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className=''>{session.session_title}</TableCell>
                  <TableCell>{session.session_category}</TableCell>
                  <TableCell>
                    <button
                      className={`${
                        session.status === "approve"
                          ? "bg-color1"
                          : session.status === "reject"
                          ? "bg-color10"
                          : "bg-color11"
                      } px-2 py-1 rounded cursor-default uppercase text-color4 font-semibold`}>
                      {session.status === "approve"
                        ? "Approved"
                        : session.status === "reject"
                        ? "Rejected"
                        : "Pending"}
                    </button>
                  </TableCell>
                  {session.status === "reject" && (
                    <>
                      <TableCell className='flex flex-col lg:flex-row gap-1 lg:gap-4 items-center'>
                        <button
                          onClick={() => handleRequestAgain(session._id)}
                          className='px-2 bg-color11 py-1 rounded capitalize text-color4 font-semibold'>
                          Send Again
                        </button>
                        <span>OR</span>
                        <button
                          onClick={() => handleDeleteSession(session._id)}
                          className={`bg-color10 p-2 rounded-full w-fit text-color4 font-semibold`}>
                          <RiDeleteBinLine />
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => {
                            setFeedback(session);
                            setOpenModal(!openModal);
                          }}
                          className='px-2 bg-color5 py-1 rounded capitalize text-color4 font-semibold'>
                          Feedback
                        </button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Modal
          show={openModal}
          size='xl'
          onClose={() => setOpenModal(!openModal)}
          popup>
          <Modal.Header className='bg-color9 text-color5 border-b-0' />
          <Modal.Body className=' bg-color9  rounded-b'>
            <div className='space-y-3 text-center'>
              <h5 className='text-lg font-bold text-color5'>
                Rejection Reason :{" "}
                <span className='font-medium'>{feedback.rejection_reason}</span>
              </h5>
              <p className='font-semibold text-base text-color6'>
                Feedback :{" "}
                <span className='font-normal'>{feedback.feedback}</span>
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Toaster />
    </div>
  );
};

export default ViewSessions;
