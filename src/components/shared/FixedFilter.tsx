import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoFilter, IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { categories } from "../../utils/constants";

const FixedFilter = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || undefined;

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`${location.pathname}?keyword=${keyword}`);
    setKeyword("");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[#07484a] text-2xl cursor-pointer"
      >
        <IoFilter />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl p-4 z-50 
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl text-gray-600 absolute right-4 top-4 cursor-pointer"
            >
              <IoClose />
            </button>
            <div className="mt-10 p-4 w-full flex flex-col gap-6">
              <div className="relative w-full max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="">
                  <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="keyword"
                    value={keyword}
                    onChange={handleChange}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-[#07484a] transition"
                  />
                </form>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[#07484a] font-semibold">Categories</span>

                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`${location.pathname}?category=${category}`}
                    className={`text-[#07484a] font-medium capitalize p-1 hover:bg-[#70908b68] ${
                      category === categoryParam && "bg-[#07484a] text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
                <Link
                  to={location.pathname}
                  className={`text-[#07484a] font-medium capitalize p-1 hover:bg-[#70908b68] ${
                    categoryParam === undefined && "bg-[#07484a] text-white"
                  }`}
                >
                  All Products
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FixedFilter;
