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
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const ViewMaterials = () => {
  const { user } = useAuth();
  const axoisSecure = useAxoisSecure();
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

  return (
    <div>
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
      </div>
      <Toaster />
    </div>
  );
};

export default ViewMaterials;
