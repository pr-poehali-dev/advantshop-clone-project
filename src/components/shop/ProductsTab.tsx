import { Card } from '@/components/ui/card';
import AddProductDialog from './AddProductDialog';
import ProductsTable from './ProductsTable';
import { Product, Category } from '@/types/shop';

interface ProductsTabProps {
  products: Product[];
  categories: Category[];
  isAddProductOpen: boolean;
  onAddProductOpenChange: (open: boolean) => void;
  newProduct: Partial<Product>;
  onProductChange: (product: Partial<Product>) => void;
  onAddProduct: () => void;
  onDeleteProduct: (id: string) => void;
  hasEditPermission: boolean;
  hasDeletePermission: boolean;
}

export default function ProductsTab({
  products,
  categories,
  isAddProductOpen,
  onAddProductOpenChange,
  newProduct,
  onProductChange,
  onAddProduct,
  onDeleteProduct,
  hasEditPermission,
  hasDeletePermission,
}: ProductsTabProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Список товаров
        </h3>
        <AddProductDialog
          isOpen={isAddProductOpen}
          onOpenChange={onAddProductOpenChange}
          newProduct={newProduct}
          onProductChange={onProductChange}
          categories={categories}
          onAddProduct={onAddProduct}
        />
      </div>
      <ProductsTable
        products={products}
        hasEditPermission={hasEditPermission}
        hasDeletePermission={hasDeletePermission}
        onDeleteProduct={onDeleteProduct}
      />
    </Card>
  );
}