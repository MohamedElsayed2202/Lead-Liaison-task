import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  return (
    <nav className="w-full flex items-center justify-between p-8 bg-[#E0E0E0] text-[#70908b] text-lg">
      <span className="text-2xl font-semibold text-[#07484a]">
        Scrolling Hub
      </span>
      <div className="lg:flex items-center gap-6 hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            ` hover:text-[#07484a] ${isActive && "border-b-2 text-[#07484a]"}`
          }
        >
          Using Intersection Observer
        </NavLink>
        <NavLink
          to={"/offset-scroll"}
          className={({ isActive }) =>
            ` hover:text-[#07484a] ${isActive && "border-b-2 text-[#07484a]"}`
          }
        >
          Using Offset And Height
        </NavLink>
        <NavLink
          to={"/infinite-scroll-component"}
          className={({ isActive }) =>
            ` hover:text-[#07484a] ${isActive && "border-b-2 text-[#07484a]"}`
          }
        >
          Infinite Scroll Component
        </NavLink>
      </div>
      <div className="flex items-center justify-center gap-6">
        <FaUser className="text-xl text-[#07484a]" />
        <div className="block lg:hidden">
          <HeaderMenu />
        </div>
      </div>
    </nav>
  );
};

export default Header;
