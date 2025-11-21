import { useSearchParams } from "react-router";
import useProductsQuery from "../hooks/useProductsQuery";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/shared/Card";
import CardSkeletons from "../components/shared/CardSkeletons";
import { useEffect, useRef } from "react";

const InfiniteScrollComponent = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || undefined;
  const category = searchParams.get("category") || undefined;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useProductsQuery(keyword, category);
  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];
  useEffect(() => {
    return () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    };
  }, [keyword, category]);
  return (
    <div className="h-full overflow-y-auto" id="scrollableDiv" ref={scrollRef}>
      {isFetching && (
        <div
          className="grid
                grid-cols-1 
                md:grid-cols-2 
                xl:grid-cols-3 
                2xl:grid-cols-4 gap-4 p-4"
        >
          {[1, 2, 3, 4, 5, 6, 7].map((_, index: number) => (
            <CardSkeletons key={index} />
          ))}
        </div>
      )}
      <InfiniteScroll
        dataLength={allProducts.length} // REQUIRED
        next={fetchNextPage} // load more function
        hasMore={!!hasNextPage} // React Query telling if more data
        loader={<></>}
        endMessage={
          <p className="text-center py-2 text-gray-400">No more products</p>
        }
        scrollableTarget="scrollableDiv"
        // height={400}
      >
        <div
          className="grid
                grid-cols-1 
                md:grid-cols-2 
                xl:grid-cols-3 
                2xl:grid-cols-4 gap-4 p-4"
        >
          {allProducts.map((product, index) => (
            <Card product={product} key={index} />
          ))}
          {isFetchingNextPage &&
            [1, 2, 3, 4, 5, 6, 7].map((_, index: number) => (
              <CardSkeletons key={index} />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollComponent;
