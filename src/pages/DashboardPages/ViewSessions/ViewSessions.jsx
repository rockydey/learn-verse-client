import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
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

const ViewSessions = () => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const axoisSecure = useAxoisSecure();
  const { data: sessions = [], refetch } = useQuery({
    queryKey: [user?.email, "sessions"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/sessions/${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <SectionTitle heading='View All Sessions' subHeading='' />
      <div className='mt-10'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHead className='text-center'>
              <TableHeadCell>Index</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {sessions.map((session, index) => (
                <TableRow
                  key={session._id}
                  className='text-color5 text-base font-medium text-center'>
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
                      } px-2 py-1 rounded cursor-default capitalize text-color4 font-semibold`}>
                      {session.status}
                    </button>
                  </TableCell>
                  {session.status === "reject" && (
                    <>
                      <TableCell>
                        <button className='px-2 bg-color11 py-1 rounded capitalize text-color4 font-semibold'>
                          Send Again
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
              <p className="font-semibold text-base text-color6">
                Feedback : <span className="font-normal">{feedback.feedback}</span>
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ViewSessions;
