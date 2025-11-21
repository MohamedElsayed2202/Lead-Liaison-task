import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { TiThMenuOutline } from "react-icons/ti";
import { NavLink } from "react-router";

const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[#07484a] text-2xl p-2 cursor-pointer"
      >
        <TiThMenuOutline />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-4 z-50 
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="text-xl text-gray-600 absolute right-4 top-4 cursor-pointer"
        >
          <IoClose />
        </button>
        <div className="mt-10 p-4 w-full flex flex-col gap-6">
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
      </div>
    </>
  );
};

export default HeaderMenu;
