export const addBookingRoom = async (bookingRoom) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/room-bookings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bookingRoom),
  });
  const data = await res.json();

  return data;
};

export const getBookingRoom = async (email) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/my-bookings-room/${email}`
  );
  const data = await res.json();

  return data;
};

export const getBookedRoom = async (email) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/booked-room?email=${email}`
  );
  const data = await res.json();

  return data;
};

export const deleteBooking = async (id) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/delete-booking/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
};


