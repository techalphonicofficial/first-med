import { ProductCard } from "./ProductCard";

export function ProductShelf({ products, scroll = false }) {
  if (scroll) {
    return (
      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
        {products.map((product) => (
          <div key={product.id} className="w-[230px] shrink-0 snap-start sm:w-[250px] xl:w-[270px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="shelf">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
