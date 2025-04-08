import { Link, useParams } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import useAxoisPublic from "../../../hooks/useAxoisPublic";
import fileDownload from "js-file-download";
import { FaDownload, FaGoogleDrive } from "react-icons/fa";

const StudyMaterial = () => {
  const { id } = useParams();
  const axoisSecure = useAxoisSecure();
  const axoisPublic = useAxoisPublic();
  const { data: getMaterials = [] } = useQuery({
    queryKey: ["getMaterials"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/get-materials/${id}`);
      return res.data;
    },
  });

  const handleImageDownload = (imageUrl, filename) => {
    axoisPublic
      .get(imageUrl, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <div>
      <SectionTitle heading='Download Material' subHeading='' />
      <div className='mt-10'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHead className='text-center'>
              <TableHeadCell>Index</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Tutor Email</TableHeadCell>
              <TableHeadCell>Download</TableHeadCell>
              <TableHeadCell>Drive Link</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {getMaterials.map((material, index) => (
                <TableRow
                  key={material._id}
                  className='text-color5 text-base font-medium text-center'>
                  <TableCell className='px-0 lg:px-6'>{index + 1}</TableCell>
                  <TableCell className='px-0 lg:px-6'>
                    {material.session_title}
                  </TableCell>
                  <TableCell className='px-0 lg:px-6'>
                    {material.tutor_email}
                  </TableCell>
                  <TableCell className='px-0 lg:px-6'>
                    <button
                      onClick={() =>
                        handleImageDownload(material.image, "image.jpg")
                      }
                      className='bg-color1 text-color4 flex p-2 w-fit mx-auto items-center rounded-full font-medium'>
                      <FaDownload />
                    </button>
                  </TableCell>
                  <TableCell className='px-0 lg:px-6'>
                    <Link
                      target='_blank'
                      className='bg-color11 flex w-fit mx-auto items-center rounded-full text-color4 p-2 font-medium'
                      to={material.link}>
                      <FaGoogleDrive />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterial;
