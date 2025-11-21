import type { Product } from "../../utils/interfaces";

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  return (
    <div className="bg-[#FFFFFF] rounded-[20px] overflow-hidden shadow-lg transition-transform  duration-300 ease-linear group hover:-translate-y-[5px] hover:shadow-xl ">
      <div className="h-64 overflow-hidden p-5">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform delay-300 ease-linear group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-2.5 text-[#07484a]">
          {product.title}
        </h2>
        <p className="text-sm text-[#4b827a] mb-5">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-[#07484a]">
            ${product.price}
          </span>
          <span className="text-white bg-[#07484a] px-5 py-2.5 rounded-[50px] text-sm font-semibold capitalize">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
