import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { getBookedRoom } from "../../api/booking";
import RoomDataRow from "../../components/Dashboard/RoomDataRow";
import EmptyState from "../../components/Shared/EmptyState";
import BookingDataRow from "../../components/Dashboard/BookingDataRow";

const ManageBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookedRoom, setBookedRoom] = useState([]);

  const fetchRooms = () => {
    getBookedRoom(user?.email).then((data) => setBookedRoom(data));
  };

  useEffect(() => {
    fetchRooms();
  }, [user]);

  return (
    <>
      {bookedRoom && Array.isArray(bookedRoom) && bookedRoom.length > 0 ? (
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
                        Action
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
                    {bookedRoom &&
                      bookedRoom.map((room) => (
                        <BookingDataRow
                          key={room._id}
                          room={room}
                          fetchRooms={fetchRooms}
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
          message="No booking data available"
          label="Go back"
          address="/"
        />
      )}
    </>
  );
};

export default ManageBookings;
