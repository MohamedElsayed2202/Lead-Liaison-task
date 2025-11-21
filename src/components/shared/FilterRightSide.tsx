import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { categories } from "../../utils/constants";

const FilterRightSide = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || undefined;
  const location = useLocation();
  const navigation = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(() => e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigation(`${location.pathname}?keyword=${keyword}`);
    setKeyword("");
  };
  return (
    <div className="p-4 w-full flex flex-col gap-6">
      <div className="relative w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="keyword"
            value={keyword}
            onChange={handleChange}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#07484a] focus:border-[#07484a] transition"
          />
        </form>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-[#07484a] font-semibold ">Categories</span>
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`${location.pathname}?category=${category}`}
            className={`text-[#07484a] font-medium capitalize p-1 hover:bg-[#70908b68] ${
              category === categoryParam && "bg-[#07484a] text-white"
            }`}
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
  );
};

export default FilterRightSide;
