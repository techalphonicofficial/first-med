import { ProductCard } from "./ProductCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function ProductShelf({ products, scroll = false, view = "Grid" }) {
  if (scroll) {
    return (
      <StaggerContainer className="no-scrollbar flex gap-4 overflow-x-auto pb-4 pt-2">
        {products.map((product) => (
          <StaggerItem key={product.id} className="w-[230px] shrink-0 snap-start sm:w-[250px] xl:w-[270px]">
            <ProductCard product={product} view="Grid" />
          </StaggerItem>
        ))}
      </StaggerContainer>
    );
  }

  return (
    <StaggerContainer className={view === "List" ? "grid gap-4 sm:gap-6" : "shelf pt-2"}>
      {products.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product} view={view} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
