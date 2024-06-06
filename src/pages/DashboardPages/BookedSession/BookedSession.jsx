import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxoisSecure from "../../../hooks/useAxoisSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import useAuth from "../../../hooks/useAuth";

const BookedSession = () => {
  const { user } = useAuth();
  const axoisSecure = useAxoisSecure();
  const { data: bookedSessions = [] } = useQuery({
    queryKey: [user?.email, "booked-session"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/booked-session?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{session.session_title}</TableCell>
                  <TableCell>{session.tutor_name}</TableCell>
                  <TableCell>
                    <span>{session.session_category}</span>
                  </TableCell>
                  <TableCell>{session.class_start}</TableCell>
                  <TableCell>
                    <Link
                      to={`/dashboard/booked-session/${session._id}`}
                      className='px-2 py-1 bg-color1 text-color4'>
                      View Details
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
