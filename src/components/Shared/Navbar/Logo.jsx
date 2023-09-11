import { Link } from "react-router-dom";
import logoImg from "../../../assets/images/logo.png";

const Logo = () => {
  return (
    <Link to="/">
      {/* <img
        className='hidden md:block'
        src={logoImg}
        alt='logo'
        width='100'
        height='100'
      /> */}
      <p className="hidden md:block text-2xl text-red-500 font-bold">
        RentalNest
      </p>
    </Link>
  );
};

export default Logo;
