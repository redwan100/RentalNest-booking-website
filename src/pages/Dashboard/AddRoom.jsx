import React, { useContext, useState } from "react";
import AddRoomForm from "../../components/Forms/AddRoomForm";
import { imageUpload } from "../../api/utils";
import { AuthContext } from "../../providers/AuthProvider";
import addRoom from "../../api/rooms";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { user } = useContext(AuthContext);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [loading, setLoading] = useState(false);

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleDates = (ranges) => {
    setDates(ranges.selection);
  };

  // handle form submit
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const location = e.target.location.value;
    const title = e.target.title.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const price = e.target.price.value;
    const guest = e.target.total_guest.value;
    const bedrooms = e.target.bedrooms.value;
    const bathrooms = e.target.bathrooms.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const image = e.target.image.files[0];

    // IMAGE UPLOAD
    imageUpload(image).then((data) => {
      const roomData = {
        image: data.data.display_url,
        location,
        title,
        price,
        host: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        },
        to,
        from,
        guest,
        bedrooms,
        bathrooms,
        description,
        category,
      };

      addRoom(roomData)
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            setLoading(false);
            toast.success("Successfully post created");
          }
        })
        .catch((err) => {
          console.error(err);
          setPosting(false);
        });
    });
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };
  return (
    <>
      <AddRoomForm
        handleSubmit={handleSubmit}
        uploadButtonText={uploadButtonText}
        handleImageChange={handleImageChange}
        dates={dates}
        handleDates={handleDates}
        loading={loading}
      />
    </>
  );
};

export default AddRoom;
