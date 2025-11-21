import { Outlet } from "react-router";
import FilterRightSide from "../components/shared/FilterRightSide";
import FixedFilter from "../components/shared/FixedFilter";
import Header from "../components/shared/HeaderComp";

const MainLayout = () => {
  return (
    <>
      <Header />

      <main className="w-full h-[calc(100vh-104px)] overflow-hidden p-8 flex flex-col gap-8 items-center bg-[#fdfbf8]">
        <div className="flex justify-center relative w-full">
          <div className="absolute top-1 -left-5 sm:left-1.5 lg:hidden flex justify-center items-center">
            <FixedFilter />
          </div>
          <div className="text-3xl font-bold text-[#07484a] ">
            Explore all products
          </div>
        </div>
        <div className="w-full h-[calc(100vh-172px)] flex items-start justify-center text-[#07484a] text-xl font-medium">
          <div className="h-full lg:flex-1/5 hidden lg:block">
            <FilterRightSide />
          </div>
          <div className="h-full lg:flex-4/5 flex-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default MainLayout;
