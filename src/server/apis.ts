import { delay, http, HttpResponse } from "msw";
import db from "./fake_db.json";
import type { Product } from "../utils/interfaces";
export const apis = [
  http.get("/api/v1/products", async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 15);
    const keyword = url.searchParams.get("keyword");
    const category = url.searchParams.get("category");
    const from = (page - 1) * limit;
    const to = from + limit;

    if (keyword !== null) {
      const foundedProducts = db.filter((product: Product) =>
        product.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      );
      const products = foundedProducts.slice(from, to) as Product[];
      await delay(Math.floor(Math.random() * 700) + 300);
      return HttpResponse.json(
        {
          data: { products, total: foundedProducts.length, page, limit },
        },
        { status: 200 }
      );
    }

    if (category !== null) {
        console.log({category});
        
      const foundedProducts = db.filter(
        (product: Product) =>
          product.category.toLocaleLowerCase() === category.toLocaleLowerCase()
      );
      const products = foundedProducts.slice(from, to) as Product[];
      await delay(Math.floor(Math.random() * 700) + 300);
      return HttpResponse.json(
        {
          data: { products, total: foundedProducts.length, page, limit },
        },
        { status: 200 }
      );
    }

    const products = db.slice(from, to) as Product[];

    await delay(Math.floor(Math.random() * 700) + 300);
    return HttpResponse.json(
      {
        data: { products, total: db.length, page, limit },
      },
      { status: 200 }
    );
  }),
];
