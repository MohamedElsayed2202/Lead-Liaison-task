import { useEffect, useRef } from "react";
import useProductsQuery from "../hooks/useProductsQuery";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import type { Product } from "../utils/interfaces";
import Card from "../components/shared/Card";
import CardSkeletons from "../components/shared/CardSkeletons";
import { useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

const IntersectionObserver = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const keyword = searchParams.get("keyword") || undefined;
  const category = searchParams.get("category") || undefined;

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useProductsQuery(keyword, category);
  const loaderRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(loaderRef, () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["products", keyword, category] });
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    };
  }, [keyword, category]);
  return (
    <div className="h-full overflow-y-auto" ref={scrollRef}>
      <div
        className="w-full grid
                grid-cols-1 
                md:grid-cols-2 
                xl:grid-cols-3 
                2xl:grid-cols-4 gap-4 p-4"
      >
        {data?.pages.map((page) =>
          page.products.map((product: Product, index: number) => (
            <Card product={product} key={index} />
          ))
        )}
        {(isFetchingNextPage || isFetching) &&
          [1, 2, 3, 4, 5, 6, 7].map((_, index: number) => (
            <CardSkeletons key={index} />
          ))}

        <div ref={loaderRef} className="h-16" />

        {data?.pages[0].products.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default IntersectionObserver;
