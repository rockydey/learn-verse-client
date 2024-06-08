import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import useBookedSession from "../../../hooks/useBookedSession";
import { TbListDetails } from "react-icons/tb";

const BookedSession = () => {
  const bookedSessions = useBookedSession();

  return (
    <div className='px-2 md:px-4 lg:px-0'>
      <SectionTitle heading='All Booked Sessions' />
      <div className='mt-10'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHead className='text-center'>
              <TableHeadCell>Index</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Tutor</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Class Start</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {bookedSessions.map((session, index) => (
                <TableRow
                  key={session._id}
                  className='text-color5 text-base font-medium text-center'>
                  <TableCell className='px-0 lg:px-6 py-4'>
                    {index + 1}
                  </TableCell>
                  <TableCell className='px-0 lg:px-6 py-4'>
                    {session.session_title}
                  </TableCell>
                  <TableCell className='px-0 lg:px-6 py-4'>
                    {session.tutor_name}
                  </TableCell>
                  <TableCell className='px-0 lg:px-6 py-4'>
                    <span>{session.session_category}</span>
                  </TableCell>
                  <TableCell className='px-0 lg:px-6 py-4'>
                    {session.class_start}
                  </TableCell>
                  <TableCell className='px-0 lg:px-6 py-4'>
                    <Link
                      to={`/dashboard/booked-session/${session._id}`}
                      className='p-2 text-lg w-fit flex ml-auto md:ml-0 items-center bg-color1 rounded-full text-color4'>
                      <TbListDetails />
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

export default BookedSession;
