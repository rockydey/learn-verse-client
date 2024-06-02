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

const AllSessions = () => {
  const axoisSecure = useAxoisSecure();
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("");
  const [approveId, setApproveId] = useState(null);
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
      .patch(`/sessions/${approveId}`, { regAmount })
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Registration fee updated!");
          refetch();
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div>
      <SectionTitle heading='Manage All Sessions' subHeading='' />
      <div className='mt-10'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHead className='text-center'>
              <TableHeadCell>Index</TableHeadCell>
              <TableHeadCell>Tutor Name</TableHeadCell>
              <TableHeadCell>Tutor Email</TableHeadCell>
              <TableHeadCell>Session Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {allSessions.map(
                (session, index) =>
                  session.status !== "reject" && (
                    <TableRow
                      key={session._id}
                      className='text-color5 text-base font-medium text-center'>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className=''>{session.tutor_name}</TableCell>
                      <TableCell>{session.tutor_email}</TableCell>
                      <TableCell>{session.session_title}</TableCell>
                      <TableCell>{session.session_category}</TableCell>
                      {session.status === "pending" ? (
                        <>
                          <TableCell>
                            <button
                              onClick={() => {
                                setApproveId(session._id);
                                setOpenModal(!openModal);
                              }}
                              className={`bg-color1 px-2 py-1 rounded capitalize text-color4 font-semibold`}>
                              Approve
                            </button>
                          </TableCell>
                          <TableCell>
                            <button
                              className={`bg-color10 px-2 py-1 rounded capitalize text-color4 font-semibold`}>
                              Reject
                            </button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>
                            <button
                              className={`bg-color1 p-2 rounded-full capitalize text-color4 font-semibold`}>
                              <GrUpdate />
                            </button>
                          </TableCell>
                          <TableCell>
                            <button
                              className={`bg-color10 p-2 rounded-full capitalize text-color4 font-semibold`}>
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
                    rows={5}
                    id='regAmount'
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
                    className='bg-color1 px-4 py-3 font-semibold text-base text-color4 uppercase cursor-pointer'
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
