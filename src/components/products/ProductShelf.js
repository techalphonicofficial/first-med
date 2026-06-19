import { ProductCard } from "./ProductCard";

export function ProductShelf({ products, scroll = false, view = "Grid" }) {
  if (scroll) {
    return (
      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
        {products.map((product) => (
          <div key={product.id} className="w-[230px] shrink-0 snap-start sm:w-[250px] xl:w-[270px]">
            <ProductCard product={product} view="Grid" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={view === "List" ? "grid gap-4 sm:gap-6" : "shelf"}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} view={view} />
      ))}
    </div>
  );
}
