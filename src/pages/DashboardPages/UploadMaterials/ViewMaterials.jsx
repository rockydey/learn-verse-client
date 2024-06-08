import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import { Modal } from "flowbite-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const ViewMaterials = () => {
  const { user } = useAuth();
  const axoisSecure = useAxoisSecure();
  const [updateMaterial, setUpdateMaterial] = useState({});
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { data: materials = [], refetch } = useQuery({
    queryKey: [user?.email, "materials"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/materials/${user.email}`);
      return res.data;
    },
  });

  const handleDeleteMaterial = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2ECA7F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Okay",
    }).then((result) => {
      if (result.isConfirmed) {
        axoisSecure.delete(`/materials/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            toast.success("Material deleted successfully!");
            refetch();
          }
        });
      }
    });
  };

  const handleUpdateMaterial = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const driveLink = form.link.value;
    const image = form.imgLink.value;

    const updateInfo = {
      title,
      driveLink,
      image,
    };

    axoisSecure.patch(`/materials/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Material updated successfully!");
        refetch();
        setOpenModal(!openModal);
      }
    });
  };

  return (
    <div className='px-2 md:px-4 lg:px-0'>
      <SectionTitle heading='View All Materials' subHeading='' />
      <div className='mt-10'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHead className='text-center'>
              <TableHeadCell>Index</TableHeadCell>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Update</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {materials.map((material, index) => (
                <TableRow
                  key={material._id}
                  className='text-color5 text-base font-medium text-center'>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img className='w-14 mx-auto' src={material.image} alt='' />
                  </TableCell>
                  <TableCell>{material.session_title}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => {
                        setUpdateMaterial(material);
                        setOpenModal(!openModal);
                        setId(material._id);
                      }}
                      className={`bg-color1 p-2 rounded-full text-color4 font-semibold`}>
                      <GrUpdate />
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeleteMaterial(material._id)}
                      className={`bg-color10 p-2 rounded-full text-color4 font-semibold`}>
                      <RiDeleteBinLine />
                    </button>
                  </TableCell>
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
          <Modal.Header className='bg-color5 text-color9 border-b-0' />
          <Modal.Body className=' bg-color5  rounded-b'>
            <div className=''>
              <h5 className='text-2xl mb-5 text-center font-bold font-merriweather text-color1'>
                Update Material
              </h5>
              <form
                onSubmit={handleUpdateMaterial}
                className='max-w-md mx-auto text-color9 rounded-xl  space-y-4'>
                <div className='space-y-1'>
                  <label htmlFor='title' className='text-lg font-semibold '>
                    Section Title:
                  </label>
                  <input
                    id='title'
                    type='text'
                    defaultValue={updateMaterial.session_title}
                    className='w-full border-0 bg-color7 text-color5 rounded-md'
                  />
                </div>
                <div className='space-y-1'>
                  <label htmlFor='link' className='text-lg font-semibold '>
                    Drive Link:
                  </label>
                  <input
                    id='link'
                    name='link'
                    type='text'
                    defaultValue={updateMaterial.link}
                    className='w-full border-0 bg-color7 text-color5 rounded-md'
                  />
                </div>
                <div className='space-y-1'>
                  <label htmlFor='imgLink' className='text-lg font-semibold '>
                    Image Link:
                  </label>
                  <input
                    id='imgLink'
                    name='imgLink'
                    type='text'
                    defaultValue={updateMaterial.image}
                    className='w-full border-0 bg-color7 text-color5 rounded-md'
                  />
                </div>
                <div className='text-center'>
                  <input
                    type='submit'
                    value='Update'
                    className='bg-color1 rounded-md px-4 py-3 font-semibold text-base text-color4 uppercase cursor-pointer'
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

export default ViewMaterials;
