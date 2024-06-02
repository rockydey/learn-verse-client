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

const ViewSessions = () => {
  const { user } = useAuth();
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
                      } px-2 py-1 rounded capitalize text-color4 font-semibold`}>
                      {session.status}
                    </button>
                  </TableCell>
                  {session.session === "reject" && (
                    <TableCell>
                      <button className='px-2 bg-color11 py-1 rounded capitalize text-color4 font-semibold'>
                        Sent Again
                      </button>
                    </TableCell>
                  )}
                  {session.session === "reject" && (
                    <TableCell>
                      <button className='px-2 bg-color5 py-1 rounded capitalize text-color4 font-semibold'>
                        Feedback
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ViewSessions;
