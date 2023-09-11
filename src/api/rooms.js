const addRoom = async (roomData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/add-rooms`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(roomData),
  });
  const data = await res.json();

  return data;
};

export const getAllRooms = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/all-rooms`);
  const data = await res.json();
  console.log(data);

  return data;
};

export const getRoom = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/room/${id}`);
  const data = await res.json();

  return data;
};

export const updateRoomStatus = async (id, status) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/room/status/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();

  return data;
};

export const getRooms = async (email) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${email}`);
  const data = await res.json();

  return data;
};

export const deleteRoom = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/delete-room/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};

export default addRoom;
