import React, { useContext, useState } from "react";
import Calender from "../Rooms/Calender";
import Button from "../Button/Button";
import { AuthContext } from "../../providers/AuthProvider";
import BookingModal from "../Modal/BookingModal";
import { formatDistance } from "date-fns";
// import { addBookingRoom } from "../../api/booking";
// import toast from "react-hot-toast";
// import { updateRoomStatus } from "../../api/rooms";
import { useNavigate } from "react-router-dom";
const RoomReservation = ({ roomData }) => {
  const { user, role } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const totalPrice =
    parseFloat(
      formatDistance(new Date(roomData.to), new Date(roomData.from)).split(
        " "
      )[0]
    ) * roomData.price;

  const [value, setValue] = useState({
    startDate: new Date(roomData?.from),
    endDate: new Date(roomData?.to),
    key: "selection",
  });

  const [bookingInfo, setBookingInfo] = useState({
    guest: {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
    },
    host: roomData.host.email,
    location: roomData.location,
    title: roomData.title,
    price: totalPrice,
    to: value?.endDate,
    from: value?.startDate,
    originPrice: roomData.price,
    roomId: roomData._id,
    image: roomData.image,
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (ranges) => {
    setValue({ ...value });
  };

  // const modalHandler = () => {
  //   toast.loading("Loading...");
  //   addBookingRoom(bookingInfo)
  //     .then((data) => {
  //       toast.dismiss();
  //       if (data.insertedId) {
  //         toast.success("Booking successful");
  //         updateRoomStatus(roomData._id, true)
  //           .then((data) => {
  //             navigate("/dashboard/my-bookings");
  //           })
  //           .catch((err) => console.log(err));
  //         closeModal();
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        <div className="flex flex-row items-center gap-1 p-4">
          <div className="text-2xl font-semibold">$ {roomData?.price}</div>
          <div className="font-light text-neutral-600">night</div>
        </div>
        <hr />
        <Calender value={value} handleChange={handleChange} />
        <hr />
        <div className="p-4">
          <Button
            onClick={() => setIsOpen(true)}
            disabled={roomData.host.email === user?.email || roomData?.booked}
            label="Reserve"
            booked={roomData?.booked}
          />
        </div>
        <hr />
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
          <div>Total</div>
          <div>$ {isNaN(totalPrice) ? roomData.price : totalPrice} </div>
        </div>
      </div>
      <BookingModal
        bookingInfo={bookingInfo}
        closeModal={closeModal}
        isOpen={isOpen}
        totalPrice={totalPrice}
        // modalHandler={modalHandler}
      />
    </>
  );
};

export default RoomReservation;
