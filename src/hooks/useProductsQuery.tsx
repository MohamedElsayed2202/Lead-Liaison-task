import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
interface FetchParams {
  pageParam?: number;
  keyword?: string;
  category?: string;
}
const fetchProducts = async ({
  pageParam = 1,
  keyword,
  category,
}: FetchParams) => {
  const { data } = await axios.get("/api/v1/products", {
    params: {
      page: pageParam,
      limit: 15,
      keyword,
      category,
    },
  });
  return data.data;
};

export default function useProductsQuery(keyword?: string, category?: string) {
  return useInfiniteQuery({
    queryKey: ["products", keyword, category],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, keyword, category }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, limit, total } = lastPage;
      const hasNextPage = page * limit < total;
      return hasNextPage ? page + 1 : undefined;
    },
  });
}
