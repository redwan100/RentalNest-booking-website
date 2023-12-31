import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import RoomDataRow from "../../components/Dashboard/RoomDataRow";
import EmptyState from "../../components/Shared/EmptyState";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Shared/Loader";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const {
    data: rooms = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myListings", user?.email],
    queryFn: async () => {
      const data = await axiosSecure.get(`/rooms/${user?.email}`);
      console.log(data.data);
      return data.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {rooms && Array.isArray(rooms) && rooms.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        To
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Delete
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Table Data */}
                    {rooms &&
                      rooms.map((room) => (
                        <RoomDataRow
                          key={room._id}
                          room={room}
                          refetch={refetch}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          message="No room data available"
          label="Add Room"
          address="/dashboard/add-room"
        />
      )}
    </>
  );
};

export default MyListings;
