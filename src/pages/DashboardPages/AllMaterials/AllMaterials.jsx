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
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogleDrive } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const AllMaterials = () => {
  const axoisSecure = useAxoisSecure();
  const { data: allMaterials = [], refetch } = useQuery({
    queryKey: "allMaterials",
    queryFn: async () => {
      const res = await axoisSecure.get("/allMaterials");
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
    <div className='px-2 md:px-4 lg:px-0'>
      <Helmet>
        <title>LearnVerse | Dashboard | All Materials</title>
      </Helmet>
      <SectionTitle heading='Manage All Materials' subHeading='' />
      <div className='mt-10'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHead className='text-center'>
              <TableHeadCell>Index</TableHeadCell>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Session Title</TableHeadCell>
              <TableHeadCell>Tutor Email</TableHeadCell>
              <TableHeadCell>Drive Link</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {allMaterials.map((material, index) => (
                <TableRow
                  key={material._id}
                  className='text-color5 text-base font-medium text-center'>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img className='w-14' src={material.image} alt='' />
                  </TableCell>
                  <TableCell>{material.session_title}</TableCell>
                  <TableCell>{material.tutor_email}</TableCell>
                  <TableCell>
                    <Link
                      target='_black'
                      className='bg-color1 flex items-center p-2 rounded-full w-fit mx-auto text-color4'
                      to={material.link}>
                      <FaGoogleDrive />
                    </Link>
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

export default AllMaterials;
