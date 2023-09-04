import { NavLink } from "react-router-dom";
import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { becomeHost } from "../../api/auth";
import HostModal from "../Modal/HostRequestModal";
import toast from "react-hot-toast";

const GuestMenu = () => {
  const { user, role, setRole } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = (email) => {
    becomeHost(email)
      .then((data) => {
        toast.success("Now you are host");
        setRole("host");
      })
      .catch((err) => console.error(err));

    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <NavLink
        to="my-bookings"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
          }`
        }
      >
        <BsFingerprint className="w-5 h-5" />

        <span className="mx-4 font-medium">My Bookings</span>
      </NavLink>

      {!role && (
        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
        >
          <GrUserAdmin className="w-5 h-5" />

          <span className="mx-4 font-medium">Become A Host</span>
          <HostModal
            isOpen={isOpen}
            closeModal={closeModal}
            modalHandler={modalHandler}
            email={user?.email}
          />
        </div>
      )}
    </>
  );
};

export default GuestMenu;
