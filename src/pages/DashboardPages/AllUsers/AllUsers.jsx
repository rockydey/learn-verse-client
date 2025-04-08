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
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const [query, setQuery] = useState("");
  const axoisSecure = useAxoisSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", query],
    queryFn: async () => {
      const res = await axoisSecure.get(`/users?search=${query}`);
      return res.data;
    },
  });

  const handleChangeRole = (user) => {
    if (user.user_role === "teacher") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2ECA7F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Make Admin",
      }).then((result) => {
        if (result.isConfirmed) {
          axoisSecure
            .patch(`/users/${user._id}`, { user_role: "admin" })
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                Swal.fire({
                  title: "Congratulation!",
                  text: "You have been promote to Admin",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2000,
                });
                refetch();
              }
            })
            .catch((error) => toast.error(error.message));
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2ECA7F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Make Teacher",
      }).then((result) => {
        if (result.isConfirmed) {
          axoisSecure
            .patch(`/users/${user._id}`, { user_role: "teacher" })
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                Swal.fire({
                  title: "Congratulation!",
                  text: "You have been promote to Teacher",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2000,
                });
                refetch();
              }
            })
            .catch((error) => toast.error(error.message));
        }
      });
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchText = event.target.search.value;
    setQuery(searchText);
  };

  return (
    <div className='px-2 md:px-4 lg:px-0'>
      <Helmet>
        <title>LearnVerse | Dashboard | All Users</title>
      </Helmet>
      <SectionTitle heading='Manage All Users' subHeading='' />
      <div className='mt-10'>
        <form onSubmit={handleSearch} className='text-center mb-6'>
          <input
            type='text'
            name='search'
            placeholder='Search user'
            className='rounded-s-md border-none bg-color7 text-color5'
          />
          <input
            className='bg-color1 cursor-pointer rounded-e-md px-4 py-2 text-base text-color4 font-bold'
            type='submit'
            value='Search'
          />
        </form>
        <div className='overflow-x-auto'>
          <Table>
            <TableHead className='text-center'>
              <TableHeadCell>Index</TableHeadCell>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {users.map((user, index) => (
                <TableRow
                  key={user._id}
                  className='text-color5 text-base font-medium text-center'>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className=''>
                    <img
                      className='w-16 inline-block rounded-full'
                      src={user.user_image}
                      alt=''
                    />
                  </TableCell>
                  <TableCell className='px-0 md:px-6'>
                    {user.user_name}
                  </TableCell>
                  <TableCell>{user.user_email}</TableCell>
                  <TableCell className=''>
                    <button
                      onClick={() => handleChangeRole(user)}
                      disabled={user.user_role === "admin"}
                      className={`uppercase disabled:cursor-not-allowed ${
                        user.user_role === "admin"
                          ? "bg-color11"
                          : user.user_role === "teacher"
                          ? "bg-color1"
                          : "bg-color5"
                      } px-3 py-2 rounded-md text-color4`}>
                      {user.user_role}
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

export default AllUsers;
